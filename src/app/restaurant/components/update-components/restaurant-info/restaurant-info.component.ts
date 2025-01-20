// auth/restaurant-info/restaurant-info.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from "../../../services/restaurant.service";
import {Router, RouterModule} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-restaurant-info',
  standalone: true,
  templateUrl: './restaurant-info.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterModule,
    MatButton
  ],
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {
  formGroup!: FormGroup;
  dpImagePreview: string | null = null;
  coverImagePreview: string | null = null;
  displayImagePreview: string | null = null;
  dpImageFile: File | null = null;
  coverImageFile: File | null = null;
  displayImageFile: File | null = null;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private http: HttpClient, private router: Router) {
    this.formGroup = this.fb.group({
      dpImage: [null],
      coverImage: [null],
      displayImage: [null]
    });
  }

  ngOnInit(): void {
    this.loadRestaurantImages();
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.formGroup.get(field)?.setValue(file);
      if (field === 'dpImage') {
        this.dpImageFile = file;
      } else if (field === 'coverImage') {
        this.coverImageFile = file;
      } else if (field === 'displayImage') {
        this.displayImageFile = file;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'dpImage') {
          this.dpImagePreview = reader.result as string;
        } else if (field === 'coverImage') {
          this.coverImagePreview = reader.result as string;
        } else if (field === 'displayImage') {
          this.displayImagePreview = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  loadRestaurantImages(): void {
    this.restaurantService.getRestaurantImagesByUser().subscribe({
      next: data => {
        if (data) {
          this.dpImagePreview = data.dpImage ? `data:image/jpeg;base64,${data.dpImage}` : null;
          this.coverImagePreview = data.coverImage ? `data:image/jpeg;base64,${data.coverImage}` : null;
          this.displayImagePreview = data.displayImage ? `data:image/jpeg;base64,${data.displayImage}` : null;
        }
      },
      error: err => {
        console.error('Error loading images:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = new FormData();

      // Use existing images if no new image is provided
      formData.append('dpImage', this.dpImageFile ? this.dpImageFile : this.dpImagePreview ? new Blob() : new Blob());
      formData.append('coverImage', this.coverImageFile ? this.coverImageFile : this.coverImagePreview ? new Blob() : new Blob());
      formData.append('displayImage', this.displayImageFile ? this.displayImageFile : this.displayImagePreview ? new Blob() : new Blob());

      this.http.put('http://localhost:8000/restaurant/images', formData).subscribe({
        next: () => {
          this.router.navigate(['/restaurant/edit/address']);
        },
        error: err => {
          console.error('Error updating images:', err);
          this.http.post('http://localhost:8000/restaurant/images', formData).subscribe({
            next: () => {
              this.router.navigate(['/restaurant/edit/address']);
            },
            error: err => {
              console.error('Error posting images:', err);
            }
          });
          }
      });
    }
  }
}
