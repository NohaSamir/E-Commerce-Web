import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

// Decorator to make this service injectable
// It injects the service at the root level, making it a singleton
// To Inject this service into a component, add it to the constructor of that component and remove providerIn
@Injectable({ providedIn: 'root' })
export class ProductService {

  // products = signal<Product[]>([
  //   { id: 1, title: 'Laptop', price: 999.99, description: 'A high-performance laptop.' },
  //   { id: 2, title: 'Smartphone', price: 699.99, description: 'A latest model smartphone.' },
  //   { id: 3, title: 'Headphones', price: 199.99, description: 'Noise-cancelling headphones.' },
  // ]);

  http = inject(HttpClient);

  fetchProducts(): Observable<Product[]> {
    const URL = "https://fakestoreapi.com/products";
    
    return this.http.get<Product[]>(URL).pipe(
      map((data: any[]) => {
        return data.map((item: any) =>
          new Product(item.id, item.title, item.price, item.description)
        );
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        throw error;
      })
    );
    // return fetch(URL)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.products.set(data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching products:', error);
    //   });

  }
}
