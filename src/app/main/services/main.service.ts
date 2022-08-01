import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Person } from '../models/person';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private readonly url = 'http://localhost:9000/api'

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`).
    pipe(
      //tap(p => console.log(p)),
      catchError((e) => {
        return throwError(() => new Error(e))
      })
    )
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).
    pipe(
      //tap(p => console.log(p)),
      catchError((e) => {
        return throwError(() => new Error(e))
      })
    )
  }
}
