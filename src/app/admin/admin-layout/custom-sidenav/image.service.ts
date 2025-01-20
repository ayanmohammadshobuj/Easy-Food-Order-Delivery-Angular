import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8000/api/user/images/jwt';

  constructor(private http: HttpClient) {}

  getImage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
