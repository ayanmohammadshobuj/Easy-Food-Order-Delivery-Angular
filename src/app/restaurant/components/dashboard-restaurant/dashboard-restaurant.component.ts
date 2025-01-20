import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForOf } from "@angular/common";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-dashboard-restaurant',
  standalone: true,
  imports: [
    NgForOf,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatGridList,
    MatGridTile,
    MatButton,
    MatCardActions
  ],
  templateUrl: './dashboard-restaurant.component.html',
  styleUrl: './dashboard-restaurant.component.css'
})
export class DashboardRestaurantComponent implements OnInit {
  restaurant: any;
  statistics = [
    { title: 'Total Orders', value: 0 },
    { title: 'Total Sales', value: '$0' },
    { title: 'Monthly Sales', value: '$0' },
    { title: 'Yearly Sales', value: '$0' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRestaurant();
    this.fetchOrders();
  }

  fetchRestaurant() {
    this.http.get('http://localhost:8000/api/admin/restaurants/user').subscribe((data: any) => {
      this.restaurant = data;
    });
  }

  fetchOrders() {
    // @ts-ignore
    this.http.get('http://localhost:8000/api/admin/order').subscribe((data: any[]) => {
      const orders = data;
      const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      const monthlySales = orders
        .filter(order => new Date(order.createdAt).getMonth() === new Date().getMonth())
        .reduce((sum, order) => sum + order.totalPrice, 0);
      const yearlySales = orders
        .filter(order => new Date(order.createdAt).getFullYear() === new Date().getFullYear())
        .reduce((sum, order) => sum + order.totalPrice, 0);

      this.statistics = [
        { title: 'Total Orders', value: orders.length },
        { title: 'Total Sales', value: `$${totalSales}` },
        { title: 'Monthly Sales', value: `$${monthlySales}` },
        { title: 'Yearly Sales', value: `$${yearlySales}` },
      ];
    });
  }

  toggleAvailability(food: any) {
    const updatedStatus = !food.available;
    this.http
      .put(`http://localhost:8000/api/admin/food/${food.id}`, { available: updatedStatus })
      .subscribe(() => {
        food.available = updatedStatus;
      });
  }
}
