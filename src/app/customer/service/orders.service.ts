// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Orders> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Orders>(url);
  }

  addOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.apiUrl, order);
  }

  updateOrder(order: Orders): Observable<Orders> {
    return this.http.put<Orders>(`${this.apiUrl}/${order.orderId}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
