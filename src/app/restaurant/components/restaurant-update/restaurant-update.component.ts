import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RestaurantLayoutComponent } from '../../restaurant-layout/restaurant-layout.component';

@Component({
  selector: 'app-restaurant-update',
  standalone: true,
  imports: [
    MatButton,
    MatStepperModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatDivider,
    MatInput
  ],
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.css']
})
export class RestaurantUpdateComponent implements OnInit {
  formGroup: FormGroup | any;

  constructor(private fb: FormBuilder, private adminLayout: RestaurantLayoutComponent) {
    this.adminLayout.darkMode();
    this.formGroup = this.fb.group({
      restaurant: this.fb.group({
        restaurantName: ['', Validators.required],
        cuisineType: ['', Validators.required],
        restaurantType: ['', Validators.required],
        description: [''],
        openingHours: ['', Validators.required],
        closingHours: ['', Validators.required]
      }),
      address: this.fb.group({
        address: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        thana: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      contact: this.fb.group({
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        website: ['']
      })
    });
  }

  backgroundColor = computed(() => this.adminLayout.darkMode() ? '#333' : '#c7c7c7');
  textColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  iconColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  containersBackgroundColor = computed(() => this.adminLayout.darkMode() ? '#444' : '#ffffff');

  ngOnInit(): void {
  }
}
