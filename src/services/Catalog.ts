import { Product } from "../models/Product";

export class Catalog {
  private products: Product[] = [];
  private nextId = 1;

  addProduct(name: string, price: number, category: string): void {
    this.products.push(new Product(this.nextId++, name, price, category));
  }

  getAll(): Product[] {
    return this.products;
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  clear(): void {
    this.products = [];
  }

  getCount(): number {
    return this.products.length;
  }
}