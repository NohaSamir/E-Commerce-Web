import { Component, inject } from '@angular/core';
import { ProductsGridComponent } from '../../../components/products-grid-component/products-grid-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-home-page',
  imports: [ProductsGridComponent],
  templateUrl: './guest-home-page.html',
  styleUrl: './guest-home-page.css',
})
export class GuestHomePage {
  routes = inject(Router);

  login() {
    this.routes.navigate(['/login']);
  }
}
