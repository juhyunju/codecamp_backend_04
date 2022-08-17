import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoryResolver } from './productsCategory.resolver';
import { ProductsCategoryService } from './productsCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    // providers = 의존성주입
    ProductsCategoryResolver, //
    ProductsCategoryService,
  ],
})
export class ProductsCategoryModule {}
