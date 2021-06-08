import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  fetchProducts() {
    //this.products.slice()
    return [...this.products];
  }
  fetchSingleProduct(prodId: string) {
    const product = this.products.find((prod) => {
      return prod.id === prodId;
    });
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return { ...product };
  }
}
