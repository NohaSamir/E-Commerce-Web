import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { UpperCasePipe } from '@angular/common';
import { Product } from '../../models/product';
import { HighlightPriceyProducts } from '../../directives/highlight-pricey-products';
import { ProductDetailsComponent } from "../product-details-component/product-details-component";

@Component({
  selector: 'app-product-component',
  imports: [UpperCasePipe, HighlightPriceyProducts, ProductDetailsComponent],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
  providers: [ProductService],
})
export class ProductComponent implements OnInit {

  //productService = inject(ProductService);
  constructor(private productService: ProductService) {
  }

  // Using computed to create a reactive products property
  // whenever productService.products() changes, this.products will update
  // products = computed(() => this.productService.products());

  products = signal<Product[]>([]);
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    console.log('Home component initialized');
    this.productService.fetchProducts()
      .subscribe( products => {
        this.products.set(products);
        
        // this.products().forEach(product => {
        //   console.log(`Product: ${product.title}, Price: ${product.price} USD, Is Pricey: ${product.isPricey}`);
        // });
      }
      );
  }

  onProductSelected(product: Product): void {
    this.selectedProduct = product;
  }
}
