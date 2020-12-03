import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cart } from '../models/Cart'
import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartCrudService {
  private url = "http://localhost:3000/user/cart";
  // private url2 = "http://localhost:3000/user//user/cart/:id";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) { }

  post(cart: Omit<Cart, "cid">): Observable<Cart> {
    return this.http.post<Cart>(this.url, cart, this.httpOptions).pipe(first());
  }

  fetchAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url, { responseType: "json" });//.pipe(tap((_)=>console.log("fetched users")));
  }
}
