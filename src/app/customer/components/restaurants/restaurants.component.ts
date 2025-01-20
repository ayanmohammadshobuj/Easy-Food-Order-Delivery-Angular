// restaurants.component.ts
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestaurantService} from '../../service/restaurant.service';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchQuery: string = '';
  categories: Category[] = [];
  visibleCategories: Category[] = [];
  currentCategoryIndex: number = 0;
  categoriesPerPage: number = 6; // Adjust based on your layout

  constructor(private restaurantService: RestaurantService, private router: Router) {
  }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.filteredRestaurants = data;
    });

    this.restaurantService.getCategories().subscribe((data) => {
      this.categories = data;
      this.categories.forEach((category) => {
        category.image = `data:image/jpeg;base64,${category.image}`;
        category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
      });
      this.updateVisibleCategories();
    });
  }

  updateVisibleCategories(): void {
    this.visibleCategories = this.categories.slice(this.currentCategoryIndex, this.currentCategoryIndex + this.categoriesPerPage);
  }

  prevCategory(): void {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex -= this.categoriesPerPage;
      this.updateVisibleCategories();
    }
  }

  nextCategory(): void {
    if (this.currentCategoryIndex + this.categoriesPerPage < this.categories.length) {
      this.currentCategoryIndex += this.categoriesPerPage;
      this.updateVisibleCategories();
    }
  }

  filterByCategory(category: string): void {
    if (category === 'All') {
      this.filteredRestaurants = this.restaurants;
    } else {
      this.filteredRestaurants = this.restaurants.filter((restaurant) =>
        restaurant.cuisineType.toLowerCase().includes(category.toLowerCase())
      );
    }
  }

  filterBySearch(): void {
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  navigateToRestaurant(id: number): void {
    this.router.navigate(['customer/restaurants', id]);
  }

  getImage(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }

  filterByRating(number: number) {
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.rating >= number
    );
    if (number === 0) {
      this.filteredRestaurants = this.restaurants;
    }
    return this.filteredRestaurants;
  }
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
