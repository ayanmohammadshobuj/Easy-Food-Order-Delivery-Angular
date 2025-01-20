import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users';
  private imagesUrl = 'http://localhost:8000/api/user/images';
  private deleteUrl = 'http://localhost:8000/auth/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${user.id}`, user);
  }

  getUserImages(): Observable<any> {
    return this.http.get<any>(this.imagesUrl);
  }

  createUserImage(userId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.imagesUrl}/create/${userId}`, formData);
  }

  updateUserImage(userId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.imagesUrl}/update/${userId}`, formData);
  }

  // deleteUserImage(userId: number): Observable<any> {
  //   return this.http.delete<any>(`${this.imagesUrl}/delete/${userId}`);
  // }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteUrl}/${userId}`);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/users/profile');
  }
}
