import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from '../../../components/products-table-component/products-table-component';
import { LoginFormComponent } from '../../../components/login-form-component/login-form-component';
import { AuthService } from '../../../services/auth/auth-service';
import { RegisterationFormComponent } from '../../../components/registeration-form-component/registeration-form-component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  imports: [ProductsTableComponent, LoginFormComponent, CommonModule, RouterLink],
  templateUrl: './admin-home-page.html',
  styleUrl: './admin-home-page.css',
})
export class AdminHomePage implements OnInit {
  authService = inject(AuthService);
  username = signal(``);

  constructor() {}

  ngOnInit(): void {
    this.username.set(this.authService.getCurrentUsername() || '');
  }

  logout() {
    this.authService.logout();
    this.username.set('');
  }
}
