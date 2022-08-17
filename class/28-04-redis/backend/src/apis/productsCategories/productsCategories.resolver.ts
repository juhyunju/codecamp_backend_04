import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesService } from './productsCategories.service';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productsCategoriesService: ProductsCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    const aaa = this.productsCategoriesService.create({ name });
    console.log(aaa);
    return aaa;
  }
}
