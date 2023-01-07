import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = "http://localhost:3000/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  /**
   * The login function takes in a username and password, and returns an observable of any type
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user.
   * @returns Observable<any>
   */
  login(username:string,password:string): Observable<any>{
    return this.http.post(AUTH_API+"login",{
      username
    },httpOptions)
  }
}
