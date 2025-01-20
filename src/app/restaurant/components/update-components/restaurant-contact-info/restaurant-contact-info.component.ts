import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCardContent} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-restaurant-contact-info',
  standalone: true,
  templateUrl: './restaurant-contact-info.component.html',
  imports: [
    ReactiveFormsModule,
    MatDivider,
    MatLabel,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./restaurant-contact-info.component.css']
})
export class RestaurantContactInfoComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private http: HttpClient, private router: Router) {
    this.formGroup = this.fb.group({
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['']
    });
  }

  ngOnInit(): void {
    this.loadContactData();
  }

  loadContactData(): void {
    this.restaurantService.getRestaurantContact().subscribe({
      next: data => {
        this.formGroup.patchValue({
          mobile: data.mobile,
          email: data.email,
          website: data.website
        });
      },
      error: err => {
        console.error('Error loading contact data:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.restaurantService.getRestaurantContact().subscribe({
        next: data => {
          this.restaurantService.updateRestaurantContact(this.formGroup.value).subscribe({
            next: () => {
              this.router.navigate(['/restaurant']);
            },
            error: err => {
              console.error('Error updating contact data:', err);
            }
          });
        },
        error: err => {
            this.restaurantService.createRestaurantContact(this.formGroup.value).subscribe({
              next: () => {
                this.router.navigate(['/restaurant']);
              },
              error: err => {
                console.error('Error posting contact data:', err);
              }
            });
        }
      });
    }
  }
}
