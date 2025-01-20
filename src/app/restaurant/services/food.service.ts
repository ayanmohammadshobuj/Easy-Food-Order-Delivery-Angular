import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'http://localhost:8000/api/admin/food';
  private categoryUrl = 'http://localhost:8000/api/category/restaurant';
  private foodUrl = 'http://localhost:8000/open/restaurants/foods';

  constructor(private http: HttpClient) { }

  createFood(foodData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, foodData);
  }

  updateFood(foodId: number, foodData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${foodId}/update`, foodData);
  }

  getFoods(): Observable<any> {
    return this.http.get(this.foodUrl);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.categoryUrl);
  }

  getFoodById(foodId: number): Observable<any> {
    return this.http.get(`http://localhost:8000/anyone/food/${foodId}`);
  }

  deleteFood(foodId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${foodId}`);
  }
}
