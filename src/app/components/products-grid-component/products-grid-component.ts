import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product-service';

@Component({
  selector: 'app-products-grid-component',
  imports: [],
  templateUrl: './products-grid-component.html',
  styleUrl: './products-grid-component.css',
})
export class ProductsGridComponent {
  cartItemCount = signal(0);

  products = signal<Product[]>([]);
  productService = inject(ProductService);
  routes = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productService.fetchProducts().subscribe((products) => {
      this.products.set(products);
    });
  }

  navigateToCart() {
    throw new Error('Method not implemented.');
  }

  addToCart(_t4: Product) {
    throw new Error('Method not implemented.');
  }
}
