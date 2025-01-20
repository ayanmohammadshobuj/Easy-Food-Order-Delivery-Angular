import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-to-cart-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-to-cart-modal.component.html',
  styleUrl: './add-to-cart-modal.component.css'
})
export class AddToCartModalComponent {
  quantity: any;

  addToCart() {
    console.log('Added to cart');
  }
}
