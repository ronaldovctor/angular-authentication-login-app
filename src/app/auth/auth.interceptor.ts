import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('token')){
            let token = localStorage.getItem('token')
            const authReq = req.clone({
                setHeaders: {
                    Authorization: token!
                }
            })
            return next.handle(authReq)
        }
        return next.handle(req)
        .pipe(
            catchError((error) => {
                console.log(error)
                if(error instanceof HttpErrorResponse){
                    if(error.status === 401){
                        this.authService.logout()
                        this.router.navigateByUrl('/login')
                    }
                }
                return throwError(() => new Error(error))
            })
        )
    }

}