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
    const product = this.findProduct(prodId[0]);
    return { ...product };
  }
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }
  findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => {
      return prod.id === prodId;
    });
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
  deleteProduct(prodId: string) {
    const [_, index] = this.findProduct(prodId);
    this.products = this.products.filter((prod, idx) => {
      return idx != index;
    });
  }
}
