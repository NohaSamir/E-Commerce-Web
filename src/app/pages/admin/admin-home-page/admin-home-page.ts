import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product/product-service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  imports: [],
  templateUrl: './admin-home-page.html',
  styleUrl: './admin-home-page.css',
})
export class AdminHomePage implements OnInit {
  products = signal<Product[]>([]);
  productService = inject(ProductService);
  routes = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  navigateToEdit(productId: number) {
    this.routes.navigate(['/edit-product', productId]);
  }

  navigateToAddProduct() {
    this.routes.navigate(['/add-product']);
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong while deleting the product.');
      },
    });
  }

  private fetchProducts() {
    this.productService.fetchProducts().subscribe((products) => {
      this.products.set(products);
    });
  }
}
