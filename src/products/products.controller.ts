import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

/* Updating 
    Patch - Make a change updating some of the properties
    Put   - replace entire object
*/

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      description,
      price,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {
    return this.productsService.fetchProducts();
  }
  @Get(':prodId')
  getProduct(@Param('prodId') prodId: string) {
    return this.productsService.fetchSingleProduct(prodId);
  }
  @Patch(':prodId')
  updateProduct(
    @Param('prodId') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, description, price);
    return null;
  }
}
