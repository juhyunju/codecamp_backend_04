import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateProductInput } from "./dto/createProduct.input";
import { UpdateProductInput } from "./dto/updateProduct.input";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService //
    ) {}

    @Query(() => [Product])
    fetchProducts() {
        return this.productService.findAll();
    }

    @Query(() => Product)
    fetchProduct(
        @Args("productId") productId: string //
    ) {
        return this.productService.findOne({ productId });
    }
    @Query(() => [Product])
    fetchProductWithDeleted() {
        return this.productService.findProductsWithDeleted();
    }

    @Mutation(() => Product)
    createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput //
    ) {
        return this.productService.create({ createProductInput });
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args("productId") productId: string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput
    ) {
        // 판매 완료가 되었는지 확인 해보기 ^^
        await this.productService.checkresion({ productId });
        return this.productService.update({ productId, updateProductInput });
    }
    @Mutation(() => Boolean)
    deleteProduct(
        @Args("productId") productId: string //
    ) {
        return this.productService.delete({ productId });
    }

    @Mutation(() => Boolean)
    restoreProduct(@Args("productId") productId: string) {
        return this.productService.restore({ productId });
    }
}
