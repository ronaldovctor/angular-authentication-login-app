import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './auth/models/user';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-app';
  authenticated$?: Observable<boolean>
  user$?: Observable<User>

  constructor(private authService: AuthService, private router: Router){
    this.authenticated$ = authService.isAuthenticated()
    this.user$ = authService.getUser()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }
}
