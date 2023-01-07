import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class ManagecryptoService {
  constructor(private http: HttpClient) {}
  /**
   * This function takes in a direction, a token, and a cryptoid and returns an observable of any type
   * @param {string} route - string - the direction of the request, either 'add' or 'remove'
   * @param {string} token - The token that was returned from the login request.
   * @param {number} cryptoid - the id of the crypto you want to add to your portfolio
   * @returns The observable is being returned.
   */
  addCryptos(route: string, token: string, cryptoid: number): Observable<any> {
    return this.http.post(
      AUTH_API + route,
      {
        cryptoid,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  /**
   * It takes in a route, a token, and a cryptoid, and returns an observable of any
   * @param {string} route - The route of the request, which is the endpoint of the API.
   * @param {string} token - The token that was returned from the login request.
   * @param {number} cryptoid - the id of the crypto you want to delete
   * @returns Observable<any>
   */
  deleteCryptos(
    route: string,
    token: string,
    cryptoid: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + route,
      {
        cryptoid,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  updateCryptos(
    route: string,
    token: string,
    currentCryptoID: number,
    cryptoid: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + route,
      {
        currentCryptoID,
        cryptoid,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
