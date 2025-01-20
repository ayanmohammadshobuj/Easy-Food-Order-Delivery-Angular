import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantService } from '../../../service/restaurant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgForOf, CurrencyPipe, NgClass } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-single-restaurant',
  standalone: true,
  imports: [NgIf, NgForOf, MatDivider, MatCard, MatCardHeader, MatCardContent, MatChip, MatCardTitle, CurrencyPipe, CartComponent, RouterLink, NgClass],
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {
  restaurant: any;
  foodItems: { [key: number]: any[] } = {};
  cartItems: { [key: number]: number } = {};
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurantById(id).subscribe(data => {
      this.restaurant = data;
      this.loadFoodItems();
      this.checkIfFavorite();
      this.loadCartItems(); // Load cart items when the component is initialized
    });
  }

  loadFoodItems(): void {
    if (this.restaurant.categories) {
      this.restaurant.categories.forEach((category: any) => {
        this.restaurantService.getFoodByCategoryId(category.id).subscribe(foodData => {
          this.foodItems[category.id] = foodData;
        });
      });
    }
  }

  loadCartItems(): void {
    const url = 'http://localhost:8000/api/cart';
    this.http.get(url).subscribe((response: any) => {
      response.items.forEach((item: any) => {
        this.cartItems[item.foodId] = item.quantity;
      });
    });
  }

  getImage(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }

  getCategories(): string {
    return this.restaurant.categories.map((c: any) => c.name).join(' . ');
  }

  addToCart(foodId: number): void {
    const url = 'http://localhost:8000/api/cart/add';
    const body = { foodId, quantity: 1 };
    this.http.put(url, body).subscribe(response => {
      console.log('Item added to cart', response);
      this.updateCartItemQuantity(foodId);
    });
  }

  removeFromCart(foodId: number): void {
    const currentQuantity = this.cartItems[foodId] || 0;
    if (currentQuantity > 1) {
      const url = `http://localhost:8000/api/cart-item/food/${foodId}/update`;
      const body = { quantity: currentQuantity - 1 };
      this.http.put(url, body).subscribe(response => {
        console.log('Item quantity decremented', response);
        this.updateCartItemQuantity(foodId);
      });
    } else {
      const url = `http://localhost:8000/api/cart-item/food/${foodId}/remove`;
      this.http.delete(url).subscribe(response => {
        console.log('Item removed from cart', response);
        this.updateCartItemQuantity(foodId);
      });
    }
  }

  getCartItemQuantity(foodId: number): number {
    return this.cartItems[foodId] || 0;
  }

  updateCartItemQuantity(foodId: number): void {
    const url = `http://localhost:8000/api/cart-item/food/${foodId}`;
    this.http.get(url).subscribe((response: any) => {
      this.cartItems[foodId] = response.quantity;
    });
  }

  addToFavorites(): void {
    const restaurantId = this.restaurant.id;
    const url = `http://localhost:8000/open/restaurants/${restaurantId}/add-favourites`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // Replace with your actual JWT token
    });

    this.http.put(url, {}, { headers }).subscribe(response => {
      console.log('Restaurant added to favorites', response);
      this.isFavorite = !this.isFavorite; // Toggle the favorite state
    }, error => {
      console.error('Error adding restaurant to favorites', error);
    });
  }

  checkIfFavorite(): void {
    const restaurantId = this.restaurant.id;
    const url = `http://localhost:8000/open/restaurants/favorites/${restaurantId}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // Replace with your actual JWT token
    });

    this.http.get(url, { headers }).subscribe(response => {
      this.isFavorite = !!response;
    }, error => {
      console.error('Error checking if restaurant is favorite', error);
    });
  }
}
