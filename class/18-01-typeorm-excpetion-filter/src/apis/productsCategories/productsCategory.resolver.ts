import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoryService } from './productsCategory.service';

@Resolver()
export class ProductsCategoryResolver {
  constructor(
    private readonly productsCategoryService: ProductsCategoryService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productsCategoryService.create({ name });
  }
}
