import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product-service';

@Component({
  selector: 'app-products-table-component',
  imports: [],
  templateUrl: './products-table-component.html',
  styleUrl: './products-table-component.css',
})
export class ProductsTableComponent implements OnInit {
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
