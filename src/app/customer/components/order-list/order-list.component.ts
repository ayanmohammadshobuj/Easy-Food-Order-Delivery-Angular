import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  deliveryDetails: { [key: number]: any } = {};

  constructor(private orderService: OrderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getUserOrders().subscribe(
      (data) => {
        this.orders = data;
        this.orders.forEach(order => this.fetchDeliveryDetails(order.id));
        this.sortOrders();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  fetchDeliveryDetails(orderId: number): void {
    this.http.get(`http://localhost:8000/api/delivery/order/${orderId}`).subscribe(
      (data) => {
        this.deliveryDetails[orderId] = data;
      },
      (error) => {
        console.error('Error fetching delivery details:', error);
      }
    );
  }

  sortOrders(): void {
    const statusOrder = {
      'CANCELLED': 7,
      'DELIVERED': 6,
      'READY_FOR_PICKUP': 5,
      'PREPARING': 4,
      'CONFIRMED': 3,
      'PENDING': 2,
      'OUT_TO_DELIVER': 1,
      'PICKED_UP': 0,
    };

    this.orders.sort((a, b) => {
      // @ts-ignore
      return (statusOrder[a.orderStatus] || 0) - (statusOrder[b.orderStatus] || 0);
    });
  }
}
