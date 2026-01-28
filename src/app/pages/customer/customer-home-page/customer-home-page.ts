import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsGridComponent } from '../../../components/products-grid-component/products-grid-component';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-customer-home-page',
  imports: [ProductsGridComponent],
  templateUrl: './customer-home-page.html',
  styleUrl: './customer-home-page.css',
})
export class CustomerHomePage {
  routes = inject(Router);
  authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {}

  logout() {
      this.authService.logout();
  }
}
