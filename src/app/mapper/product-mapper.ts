import { Product } from '../models/product';

export function mapProductToBody(product: Product) {
  return {
    id: product.id,
    name: product.title,
    price: product.price,
    description: product.description,
    stockQuantity: product.stockQuantity,
  };
}

export function mapResponseToProduct(response: any): Product {
  return new Product(response.id, response.name, response.price, response.description, response.stockQuantity);
}
