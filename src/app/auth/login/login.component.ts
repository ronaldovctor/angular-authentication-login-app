import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }) 
  }

  onSubmit(): void {
    this.loading = true
    const credentials = this.loginForm.value
    this.authService.login(credentials)
    .subscribe({
      next:(user) => {
        console.log(user)
        this.snackBar.open(`Logged in successfully. Welcome ${user.firstName} !`, 'OK', {duration: 2000})
        this.router.navigateByUrl('/')
        this.loading = false
      },
      error: (err) => {
        console.error(err.error.message)
        this.snackBar.open(`Login Error: ${err.error.message}`, 'OK', {duration: 2000})
        this.loading = false
      }
    })
  }

}
