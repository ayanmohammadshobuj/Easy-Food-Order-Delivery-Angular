import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  private apiUrl = 'http://localhost:8000/api/user/images';

  constructor(private http: HttpClient) { }

  getProfileImage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jwt`);
  }

  updateProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(this.apiUrl, formData);
  }

  createProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl, formData);
  }
}
