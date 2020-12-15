import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models/Product'
import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {
  private url = "http://localhost:3000/user/shop";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) { }

  fetchAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { responseType: "json" });//.pipe(tap((_)=>console.log("fetched users")));
  }

  getProduct(pid: Number): Observable<Product> {
    const productItem = `http://localhost:3000/user/shop/${pid}`;
    console.log(productItem)
    return this.http.get<Product>(productItem, { responseType: "json" });//.pipe(tap((_)=>console.log("fetched users")));
  }

  getProductForCart(pid: Number): Observable<Product> {
    const productItem = `http://localhost:3000/user/shop/cart/${pid}`;
    console.log(productItem)
    return this.http.get<Product>(productItem, { responseType: "json" });//.pipe(tap((_)=>console.log("fetched users")));
  }

  private urlProduct = "http://localhost:3000/product";
  postProduct(product: Product): Observable<any> {
    console.log(product);
    return this.http.post(this.urlProduct, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {

    const urlthree = `http://localhost:3000/product/${id}`;
    return this.http.delete<Product>(urlthree, this.httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    console.log(product);
    return this.http.put(this.urlProduct, product, this.httpOptions);
  }
}
