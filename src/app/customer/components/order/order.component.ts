// src/app/customer/components/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OrderService } from '../../service/order.service';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgForOf,
    MatDialogModule,
    CurrencyPipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  cartItems: any[] = [];
  totalPrice: number = 0;
  orderData: any = {
    restaurantId: 1,
    paymentMethod: '',
    paymentStatus: 'PAID',
    apartment: '',
    street: '',
    city: '',
    landmark: '',
    label: 'Home',
    phone: ''
  };

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderService.getUserProfile().subscribe(profile => {
      this.email = profile.email;
      const nameParts = profile.fullName.split(' ');
      this.firstName = nameParts[0];
      this.lastName = nameParts.slice(1).join(' ');
    });

    this.orderService.getCart().subscribe(cart => {
      this.cartItems = cart.cartItems;
      this.totalPrice = cart.totalPrice;
    });
  }

  placeOrder(): void {
    // Gather form data from inputs
    this.orderData.apartment = (document.getElementById('inputApartment') as HTMLInputElement)?.value || '';
    this.orderData.street = (document.getElementById('inputStreet') as HTMLInputElement)?.value || '';
    this.orderData.city = (document.getElementById('inputCity') as HTMLInputElement)?.value || '';
    this.orderData.landmark = (document.getElementById('inputLandmark') as HTMLInputElement)?.value || '';
    this.orderData.phone = (document.getElementById('inputPhone') as HTMLInputElement)?.value || '';

    // Get the selected payment method
    const selectedPaymentMethod = (document.querySelector('input[name="inlineRadioOptions"]:checked') as HTMLInputElement)?.value;
    if (selectedPaymentMethod) {
      this.orderData.paymentMethod = selectedPaymentMethod;
    } else {
      // Handle the case where no payment method is selected
      console.error("No payment method selected!");
      return; // Don't proceed with order placement
    }

    // Open the confirmation dialog
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, {
      width: '400px',
      data: this.orderData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.orderService.createOrder(this.orderData).subscribe(response => {
          // Handle the response and generate invoice
          console.log('Order created:', response);
        });
      }
    });
  }

}
