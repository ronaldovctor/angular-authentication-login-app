import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:9000/auth'
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User)
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}/register`, user)
  }

  login(credentials: {email:string, password: string}): Observable<User>{
    return this.http.post<User>(`${this.url}/login`, credentials)
    .pipe(
      tap((user: User) => {
        localStorage.setItem('token', user.token!)
        this.subjUser$.next(user)
        this.subjLoggedIn$.next(true)
      })
    )
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if(token && !this.subjLoggedIn$.value){
      return this.checkTokenValidation()
    }
    return this.subjLoggedIn$.asObservable()
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`)
    .pipe(
      tap((user) => {
        if(user){
          localStorage.setItem('token', user.token!)
          this.subjLoggedIn$.next(true)
          this.subjUser$.next({} as User)
        }
      }),
      map((user: User) => user ? true : false ),
      catchError((error) => {
        this.logout()
        return of(false)
      })
    )
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable()
  }

  logout(): void {
    localStorage.removeItem('token')
    this.subjLoggedIn$.next(false)
    this.subjUser$.next({} as User)
  }
}
