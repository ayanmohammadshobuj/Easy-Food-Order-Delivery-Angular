import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password });
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.authorities; // Adjust based on your token structure
    }
    return null;
  }

  getUserName(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userName');
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  isAuthenticatedCustomer(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.authorities === 'CUSTOMER';
    }
    return false;
  }

  hasRestaurant(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/admin/restaurants/user');
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
      this.router.navigate(['/user']);
    }
  }

  navigateByRole(role: string): void {
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'CUSTOMER') {
      this.router.navigate(['/home']);
    } else if (role === 'RESTAURANT') {
      this.router.navigate(['/restaurant']);
    } else if (role === 'RIDER') {
      this.router.navigate(['/rider']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
