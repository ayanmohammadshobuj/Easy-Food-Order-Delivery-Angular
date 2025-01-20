import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCardContent} from "@angular/material/card";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RestaurantService} from "../services/restaurant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurant-informations',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCardContent,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './restaurant-informations.component.html',
  styleUrl: './restaurant-informations.component.css'
})
export class RestaurantInformationsComponent {
  restaurantForm: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      cuisineType: ['', Validators.required],
      description: [''],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      this.restaurantService.createRestaurant(this.restaurantForm.value).subscribe(
        response => {
          this.router.navigate(['/restaurant']);

        },
        error => {
          console.error('Error creating restaurant:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/restaurant']);
  }

  canDeactivate(): boolean {
    return this.restaurantForm.dirty
  }
}
