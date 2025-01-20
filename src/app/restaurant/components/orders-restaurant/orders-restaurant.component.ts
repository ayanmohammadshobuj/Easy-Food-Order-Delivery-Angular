import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RestaurantsOrderService} from '../../services/restaurants-order.service';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-orders-restaurant',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    MatIcon,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatButton,
    MatCardActions,
    NgClass,
    FormsModule
  ],
  templateUrl: './orders-restaurant.component.html',
  styleUrl: './orders-restaurant.component.css'
})
export class OrdersRestaurantComponent implements OnInit {
  orders: any[] = [];
  searchTerm: string = '';
  sortOption: string = 'default';

  constructor(private orderService: RestaurantsOrderService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data.map((order: any) => ({...order, collapsed: true}));
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  toggleCollapse(order: any): void {
    order.collapsed = !order.collapsed;
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      () => {
        this.fetchOrders();
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );
  }

  cancelOrder(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.cancelOrder(orderId).subscribe(
          () => {
            this.fetchOrders();
          },
          (error) => {
            console.error('Error canceling order', error);
          }
        );
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'READY_FOR_PICKUP':
        return 'badge-ready';
      case 'CANCELLED':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  }

  setSortOption(option: string): void {
    this.sortOption = option;
  }

  filteredAndSortedOrders(): any[] {
    const statusOrder = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

    let filteredOrders = this.orders.filter(order =>
      order.customer.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.id.toString().includes(this.searchTerm) ||
      order.orderItems.some((item: any) =>
        item.food.id.toString().includes(this.searchTerm) ||
        item.food.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    if (this.sortOption === 'date') {
      filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sortOption === 'price') {
      filteredOrders.sort((a, b) => b.totalPrice - a.totalPrice);
    } else if (this.sortOption === 'default') {
      filteredOrders.sort((a, b) => statusOrder.indexOf(a.orderStatus) - statusOrder.indexOf(b.orderStatus));
    } else {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === this.sortOption);
    }

    return filteredOrders;
  }
}
