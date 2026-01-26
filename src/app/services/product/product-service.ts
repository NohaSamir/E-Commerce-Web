import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { BASE_API_URL } from '../api-config';
import { mapProductToBody, mapResponseToProduct } from '../../mapper/product-mapper';

// Decorator to make this service injectable
// It injects the service at the root level, making it a singleton
// To Inject this service into a component, add it to the constructor of that component and remove providerIn
@Injectable({ providedIn: 'root' })
export class ProductService {
  http = inject(HttpClient);
  private URL = `${BASE_API_URL}/product`;

  fetchProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.URL).pipe(
      map((data: any[]) => {
        return data.map((item: any) => mapResponseToProduct(item));
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        throw error;
      }),
    );
  }

  fetchProductById(id: number): Observable<Product> {
    const URL = `${this.URL}/${id}`;
    return this.http.get<Product>(URL).pipe(
      map((data: any) => mapResponseToProduct(data)),
      catchError((error) => {
        console.error('Error fetching product:', error);
        throw error;
      }),
    );
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.URL, mapProductToBody(product)).pipe(
      catchError((error) => {
        console.error('Error adding product:', error);
        throw error;
      }),
    );
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.URL, mapProductToBody(product)).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      }),
    );
  }

  delete(id: number) {
    const URL = `${this.URL}/${id}`;
    return this.http.delete(URL).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      }),
    );
  }
}
