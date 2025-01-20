import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import {NgForOf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-items-restaurant',
  standalone: true,
  templateUrl: './add-items-restaurant.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel
  ],
  styleUrls: ['./add-items-restaurant.component.css']
})
export class AddItemsRestaurantComponent implements OnInit {
  formGroup: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private foodService: FoodService, private router: Router) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      images: [null, Validators.required],
      restaurantId: [1, Validators.required], // Assuming restaurant ID is 1 for now
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.foodService.getCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error('Error loading categories:', err);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        images: file
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('food', JSON.stringify({
        name: this.formGroup.get('name')?.value,
        description: this.formGroup.get('description')?.value,
        price: this.formGroup.get('price')?.value,
        restaurant: { id: this.formGroup.get('restaurantId')?.value },
        category: { id: this.formGroup.get('categoryId')?.value }
      }));
      formData.append('image', this.formGroup.get('images')?.value);

      this.foodService.createFood(formData).subscribe({
        next: () => {
          this.router.navigate(['/restaurant/items']);
        },
        error: err => {
          console.error('Error creating food item:', err);
        }
      });
    }
  }
}
