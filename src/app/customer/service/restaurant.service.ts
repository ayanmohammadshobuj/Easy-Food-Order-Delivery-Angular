// restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8000/open/restaurants';
  private foodApiUrl = 'http://localhost:8000/anyone/food/category';
  private categoryApiUrl = 'http://localhost:8000/api/category';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRestaurantById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getFoodByCategoryId(categoryId: number): Observable<any[]> {
    const url = `${this.foodApiUrl}/${categoryId}`;
    return this.http.get<any[]>(url);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryApiUrl);
  }

}
