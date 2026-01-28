import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsTableComponent } from '../../../components/products-table-component/products-table-component';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-admin-home-page',
  imports: [ProductsTableComponent, CommonModule, RouterLink],
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
