
import { Injectable } from '@angular/core';
import { Categories } from '../models/categories';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Categories> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categories>(url);
  }

  addCategory(category: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.apiUrl, category);
  }

  updateCategory(category: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.apiUrl}/${category.categoryId}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

