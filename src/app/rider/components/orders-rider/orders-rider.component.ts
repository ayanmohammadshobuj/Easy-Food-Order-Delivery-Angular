import { Component, OnInit } from '@angular/core';
import { OrdersRiderService } from "../../services/orders-rider.service";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-orders-rider',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './orders-rider.component.html',
  styleUrls: ['./orders-rider.component.css']
})
export class OrdersRiderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  sortOption: string = 'default';

  constructor(private ordersRiderService: OrdersRiderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;
    this.ordersRiderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.orders.forEach((order) => {
          if (order.restaurant) {
            const restaurantId = order.restaurant.id;

            this.ordersRiderService.getRestaurantAddress(restaurantId).subscribe({
              next: (address) => {
                order.restaurantAddress = address;
              },
              error: (err) => {
                console.error(err);
                order.restaurantAddress = null;
              },
            });

            this.ordersRiderService.getRestaurantContact(restaurantId).subscribe({
              next: (contact) => {
                order.restaurantContact = contact;
              },
              error: (err) => {
                console.error(err);
                order.restaurantContact = null;
              },
            });
          } else {
            order.restaurantAddress = null;
            order.restaurantContact = null;
          }
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  acceptOrder(orderId: number): void {
    this.ordersRiderService.acceptOrder(orderId).subscribe({
      next: () => {
        alert('Order accepted successfully!');
        this.fetchOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to accept the order.');
      },
    });
  }

  setSortOption(option: string): void {
    this.sortOption = option;
  }

  get sortedOrders(): any[] {
    const statusOrder = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

    let sortedOrders = [...this.orders];

    if (this.sortOption === 'date') {
      sortedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sortOption === 'price') {
      sortedOrders.sort((a, b) => b.totalPrice - a.totalPrice);
    } else if (this.sortOption === 'default') {
      sortedOrders.sort((a, b) => statusOrder.indexOf(a.orderStatus) - statusOrder.indexOf(b.orderStatus));
    }

    return sortedOrders;
  }

  getConfirmedOrdersCount() {
    return this.orders.filter(order => order.orderStatus === 'CONFIRMED').length;
  }
}
