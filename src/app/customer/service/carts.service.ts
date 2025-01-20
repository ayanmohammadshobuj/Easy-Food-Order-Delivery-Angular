
import { Injectable } from '@angular/core';
import { Carts } from '../models/carts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Carts[]> {
    return this.http.get<Carts[]>(this.apiUrl);
  }

  getCartById(id: number): Observable<Carts> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Carts>(url);

  }

  addCart(cart: Carts): Observable<Carts> {
    return this.http.post<Carts>(this.apiUrl, cart);
  }

  updateCart(cart: Carts): Observable<Carts> {
    return this.http.put<Carts>(`${this.apiUrl}/${cart.cartId}`, cart);
  }

  deleteCart(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
