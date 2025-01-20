import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/users/profile';
  private apiUrl1 = 'http://localhost:8000/api/order';
  private apiCartUrl = 'http://localhost:8000/api/cart';
  private userOrdersUrl = 'http://localhost:8000/api/order/user/jwt';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, orderData);
  }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiCartUrl);
  }

  getUserOrders(): Observable<any> {
    return this.http.get<any>(this.userOrdersUrl);
  }
}
