import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    mobilePhone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, { validators: this.matchingPasswords})

  states: string[] = ['MG', 'RS', 'SC', 'GO', 'PR', 'SP']

  constructor(private fb: FormBuilder, private authService: AuthService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  matchingPasswords(abstractControl: AbstractControl): {matching:boolean} | null {
    if(abstractControl){
      const password1 = abstractControl.get('password1')!.value
      const password2 = abstractControl.get('password2')!.value
      if(password1 == password2)
        return null
    }
    return {matching: false}
  }

  onSubmit(): void {
    let u: User = {
      firstName: this.formRegister.value.firstName!,
      lastName: this.formRegister.value.lastName!,
      address: this.formRegister.value.address!,
      city: this.formRegister.value.city!,
      state: this.formRegister.value.state!,
      phone: this.formRegister.value.phone!,
      mobilePhone: this.formRegister.value.mobilePhone!,
      email: this.formRegister.value.email!,
      password: this.formRegister.value.password1!
    }
    this.authService.register(u).
    subscribe({
      next: (u) => {
        this.snack.open('User successfully registered! Use your credentials to Sign in.', 'OK', {duration: 2000})
        this.router.navigateByUrl('/auth/login')
      },
      error: (err) => {
        console.error(err)
        this.snack.open(`Error: ${err.error.msg}`, 'OK', {duration: 2000})
      }
    })
  }
}
