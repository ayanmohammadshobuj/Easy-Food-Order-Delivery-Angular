import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersRiderService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/order/status`);
  }

  acceptOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delivery/create/${orderId}`, {});
  }

  getRestaurantAddress(restaurantId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurants/address/restaurant/${restaurantId}`);
  }

  getRestaurantContact(restaurantId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurants/contact/restaurant/${restaurantId}`);
  }


}
