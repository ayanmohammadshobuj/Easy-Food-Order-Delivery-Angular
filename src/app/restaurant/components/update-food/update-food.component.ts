import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodService } from '../../services/food.service';
import { NgForOf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-update-food',
  standalone: true,
  templateUrl: './update-food.component.html',
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
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {
  formGroup: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<UpdateFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      images: [null],
      restaurantId: [1, Validators.required], // Assuming restaurant ID is 1 for now
      categoryId: [null, Validators.required]
    });

    if (data) {
      this.loadFoodData(data.id);
    }
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

  loadFoodData(foodId: number): void {
    this.foodService.getFoodById(foodId).subscribe({
      next: food => {
        this.formGroup.patchValue({
          name: food.name,
          description: food.description,
          price: food.price,
          restaurantId: food.restaurant?.id || 1, // Default to 1 if undefined
          categoryId: food.foodCategory?.id || null // Default to null if undefined
        });
      },
      error: err => {
        console.error('Error loading food data:', err);
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
      if (this.formGroup.get('images')?.value) {
        formData.append('image', this.formGroup.get('images')?.value);
      }

      this.foodService.updateFood(this.data.id, formData).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Error updating food item:', err);
        }
      });
    }
  }
}
