import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱서치에서 조회하기 연습 ~_~ (연습 이후에는 다시 삭제스~)
    const result = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));
    // 엘라스틱 서치에서 조회하기 위해 임시 주석스
    // return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // 엘라스틱서치에 등록하기 연습 ~^^ ( 연습 이후에는 다시 삭제~하기~)
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct04',
      document: {
        name: '철수',
        age: 13,
        school: '싸움초',
        ...createProductInput,
      },
    });
    // 엘라스틱서치에 등록해 보기 위해 임시로 주석스
    // return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productsService.checkSoldout({ productId });

    // 수정하기
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}
