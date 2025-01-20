// src/app/customer/components/favorites/favorites-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesResolver implements Resolve<any[]> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // Replace with your actual JWT token
    });

    return this.http.get<any[]>('http://localhost:8000/open/restaurants/favorites', { headers });
  }
}
