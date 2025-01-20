// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, NgForOf } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const url = 'http://localhost:8000/api/cart';
    this.http.get(url).subscribe((response: any) => {
      this.cartItems = response.cartItems;
      this.totalPrice = response.totalPrice;
    });
  }

  getImage(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }

  updateCartItemQuantity(foodId: number, quantity: number): void {
    const url = `http://localhost:8000/api/cart-item/food/${foodId}/update`;
    const body = { quantity };
    this.http.put(url, body).subscribe(() => {
      this.loadCartItems();
    });
  }

  removeCartItem(foodId: number): void {
    const url = `http://localhost:8000/api/cart-item/food/${foodId}/remove`;
    this.http.delete(url).subscribe(() => {
      this.loadCartItems();
    });
  }

  checkout() {
    // navigate to checkout page
    this.route.navigate(['customer/checkout']);
  }
}
