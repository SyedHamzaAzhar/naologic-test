import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Manufacturer, ManufacturerSchema } from 'src/schemas/manufacturer.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductCronService } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductCronService],
})
export class ProductModule {}
