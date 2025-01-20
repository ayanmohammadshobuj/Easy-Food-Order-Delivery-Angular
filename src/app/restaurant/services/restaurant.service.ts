import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8000/api/admin/restaurants';
  private imagesApiUrl = 'http://localhost:8000/restaurant/images';
  private apiUrlByUser = 'http://localhost:8000/restaurant/images/jwt';

  constructor(private http: HttpClient) {}

  createRestaurant(restaurantData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, restaurantData);
  }

  updateRestaurant(id: number, restaurantData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurantData);
  }

  getRestaurantDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details`);
  }

  updateRestaurantImages(formData: FormData): Observable<any> {
    return this.http.put<any>(this.imagesApiUrl, formData);
  }

  getRestaurantImagesByUser(): Observable<any> {
    return this.http.get<any>(this.apiUrlByUser);
  }

  getRestaurantImages(): Observable<any> {
    return this.http.get<any>(this.imagesApiUrl);
  }

  getRestaurantAddress(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/restaurants/address/jwt');
  }

  createRestaurantAddress(addressData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/restaurants/address', addressData);
  }

  updateRestaurantAddress(addressData: any): Observable<any> {
    return this.http.put<any>('http://localhost:8000/api/restaurants/address/jwt', addressData);
  }

  getRestaurantContact(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/restaurants/contact');
  }

  createRestaurantContact(contactData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/restaurants/contact', contactData);
  }

  updateRestaurantContact(contactData: any): Observable<any> {
    return this.http.put<any>('http://localhost:8000/api/restaurants/contact', contactData);
  }

  getRestaurantById(restaurantId: number) {
    return this.http.get<any>(`${this.apiUrl}/${restaurantId}`);
  }

  getFoodsByRestaurantId(restaurantId: number) {
    return this.http.get<any>(`http://localhost:8000/api/restaurants/${restaurantId}/foods`);
  }
}
