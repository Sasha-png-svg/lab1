export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: string
  ) {}

  display(): string {
    return `[${this.id}] ${this.name} - ${this.price} грн (${this.category})`;
  }
}