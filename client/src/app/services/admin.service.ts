import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getSelectList(route: String): Observable<any> {
    return this.http.post(AUTH_API + route, {});
  }
  getCryptos(route: string, id: number): Observable<any> {
    return this.http.post(AUTH_API + route, { id });
  }
}
