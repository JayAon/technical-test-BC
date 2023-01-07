import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {}
  /**
   * This function is used to get the list of crypto currencies from the server
   * @param {String} direction - The direction of the transaction.
   * @param {String} token - The token you received from the login API.
   * @returns The return is an observable of any type.
   */
  cryptoList(route: String, token: String): Observable<any> {
    return this.http.post(
      AUTH_API + route,
      {},
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
