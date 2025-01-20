import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteRestaurants: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // Replace with your actual JWT token
    });

    this.http.get<any[]>('http://localhost:8000/open/restaurants/favorites', { headers }).subscribe(
      (data) => {
        this.favoriteRestaurants = data;
      },
      (error) => {
        console.error('Error fetching favorite restaurants', error);
      }
    );
  }

  navigateToRestaurant(restaurantId: number): void {
    this.router.navigate([`/customer/restaurants/${restaurantId}`]);
  }
}
