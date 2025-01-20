// import { Injectable } from '@angular/core';
// import { Users } from '../models/users';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3000/users';

//   constructor(private http: HttpClient) {}

//   getUsers(): Observable<Users[]> {
//     return this.http.get<Users[]>(this.apiUrl);
//   }

//   getUserByEmail(email: string): Observable<Users[]> {
//     const url = `${this.apiUrl}?email=${email}`;
//     return this.http.get<Users[]>(url);
//   }

//   addUser(user: Users): Observable<Users> {
//     return this.http.post<Users>(this.apiUrl, user);
//   }

//   // New method for user login
//   loginUser(email: string, password: string): Observable<Users[]> {
//     return this.http.get<Users[]>(`${this.apiUrl}?email=${email}&password=${password}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Fetch the list of users
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('https://api.example.com/users'); // Replace with actual API endpoint
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>('https://api.example.com/users', user); // Replace with actual API endpoint
  }
}

