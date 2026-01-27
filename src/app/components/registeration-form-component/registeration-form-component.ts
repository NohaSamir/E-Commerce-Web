import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-registeration-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registeration-form-component.html',
  styleUrl: './registeration-form-component.css',
})
export class RegisterationFormComponent {
  authService = inject(AuthService);
   routes = inject(Router);

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if(this.registrationForm.invalid) return;
  
    this.authService.registerAdmin({
      username: this.registrationForm.value.username || "",
      email: this.registrationForm.value.email || "",  
      password: this.registrationForm.value.password || "",
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.routes.navigate(['/admin/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Handle registration error, e.g., show error message
        alert('Registration failed. Please try again.');
      },
    });
  }
}
