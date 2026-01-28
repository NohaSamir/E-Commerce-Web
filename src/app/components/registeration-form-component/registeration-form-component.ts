import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { RegisterRequest } from '../../models/user';

@Component({
  selector: 'app-registeration-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registeration-form-component.html',
  styleUrl: './registeration-form-component.css',
})
export class RegisterationFormComponent {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.registrationForm.invalid) return;

    const requestBody: RegisterRequest = {
      username: this.registrationForm.value.username ?? '',
      email: this.registrationForm.value.email ?? '',
      password: this.registrationForm.value.password ?? '',
    };

    const type = this.route.snapshot.data['type'];

    const request$ =
      type === 'admin'
        ? this.authService.registerAdmin(requestBody)
        : this.authService.register(requestBody);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed. Please try again.');
      },
    });
  }
}
