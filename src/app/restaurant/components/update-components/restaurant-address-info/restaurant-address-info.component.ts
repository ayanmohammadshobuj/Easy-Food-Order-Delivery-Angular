import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";
import {MatInput} from "@angular/material/input";
import {MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-restaurant-address-info',
  standalone: true,
  templateUrl: './restaurant-address-info.component.html',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatDivider,
    MatFormField,
    MatInput,
    MatCardContent,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./restaurant-address-info.component.css']
})
export class RestaurantAddressInfoComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private http: HttpClient, private router: Router) {
    this.formGroup = this.fb.group({
      fullAddress: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      thana: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAddressData();
  }

  loadAddressData(): void {
    this.restaurantService.getRestaurantAddress().subscribe({
      next: data => {
        this.formGroup.patchValue({
          fullAddress: data.fullAddress,
          street: data.street,
          city: data.city,
          thana: data.thana,
          postalCode: data.postalCode,
          country: data.country
        });
      },
      error: err => {
        console.error('Error loading address data:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.restaurantService.getRestaurantAddress().subscribe({
        next: data => {
          this.restaurantService.updateRestaurantAddress(this.formGroup.value).subscribe({
            next: () => {
              this.router.navigate(['/restaurant/edit/contact']);
            },
            error: err => {
              console.error('Error updating address data:', err);
            }
          });
        },
        error: err => {
            this.restaurantService.createRestaurantAddress(this.formGroup.value).subscribe({
              next: () => {
                this.router.navigate(['/restaurant/edit/contact']);
              },
              error: err => {
                console.error('Error posting address data:', err);
              }
            });
        }
      });
    }
  }
}
