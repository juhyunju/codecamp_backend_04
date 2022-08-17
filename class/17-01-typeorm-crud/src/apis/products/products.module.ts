import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
    ]),
  ],
  providers: [
    // providers = 의존성주입
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
