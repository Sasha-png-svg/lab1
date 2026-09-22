import { Product } from "../models/Product";

export class Catalog {
  private products: Product[] = [];
  private nextId = 1;

  addProduct(name: string, price: number, category: string): Product {
    const product = new Product(this.nextId++, name, price, category);
    this.products.push(product);
    return product;
  }

  getAll(): Product[] {
    return this.products;
  }

  getCount(): number {
    return this.products.length;
  }

  // Видалити товар за id
  removeProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  // Очистити весь каталог
  clear(): void {
    this.products = [];
  }

  // Знайти товари за категорією
  findByCategory(category: string): Product[] {
    return this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
}