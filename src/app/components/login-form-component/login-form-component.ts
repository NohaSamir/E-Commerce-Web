import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css',
})
export class LoginFormComponent {
  authService = inject(AuthService);
  routes = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } 
    this.authService
      .login({
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response.user.username);
          // Handle successful login, e.g., navigate to dashboard
          
          this.routes.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error, e.g., show error message
        },
      });
  }
}
