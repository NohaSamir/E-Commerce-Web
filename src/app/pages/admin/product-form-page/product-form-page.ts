import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';

@Component({
  selector: 'app-add-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form-page.html',
  styleUrl: './product-form-page.css',
})
export class ProductFormPage implements OnInit {
  productId: number | null = null;
  screenType: ScreenType = ScreenType.ADD;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl<number | null>(null),
    description: new FormControl(''),
    stockQuantity: new FormControl<number | null>(null),
  });

  constructor() {
    //this.productId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productId = id ? +id : null;
      this.screenType = id ? ScreenType.UPDATE : ScreenType.ADD;
    });
  }

  ngOnInit(): void {
    if (this.productId) {
      this.productService.fetchProductById(this.productId).subscribe((product) => {
        this.productForm.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          stockQuantity: product.stockQuantity,
        });
      });
    }
  }

  get submitButtonTitle(): String {
    return this.screenType === ScreenType.UPDATE ? 'Update Product' : 'Add Product';
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = this.productForm.value;

    const productData: Product = new Product(
      this.productId ?? 0,
      formData.title ?? '',
      formData.price ?? 0,
      formData.description ?? '',
      formData.stockQuantity ?? 0,
    );

    const request =
      this.screenType === ScreenType.UPDATE
        ? this.productService.updateProduct(productData)
        : this.productService.addProduct(productData);

    request.subscribe({
      next: (product) => {
        this.productForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong while saving the product.');
      },
    });
  }
}

enum ScreenType {
  UPDATE,
  ADD,
}
