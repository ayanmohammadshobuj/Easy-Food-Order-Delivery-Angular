import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationModule} from "./registration.module";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }


  private apiUrl = 'http://localhost:8000/auth/signup';


  register(user: RegistrationModule): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
