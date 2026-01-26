export class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  stockQuantity: number;

  constructor(
    id: number,
    title: string,
    price: number,
    description: string,
    stockQuantity: number,
  ) {
    this.id = id;
    this.title = title;
    this.price = Number(price);
    this.description = description;
    this.stockQuantity = Number(stockQuantity);
  }

  get isPricey(): boolean {
    return this.price > 100;
  }

  toString() {
    return `Product: ${this.title}, Price: ${this.price}, Stock: ${this.stockQuantity}, IsPricey: ${this.isPricey}`;
  }
}
