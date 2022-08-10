import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Category } from "./entities/category.entity";
import { CategoriesService } from "./catagories.service";

@Resolver()
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Mutation(() => Category)
    createCategory(
        @Args("name") name: string //
    ) {
        const aaa = this.categoriesService.create({ name });
        console.log(aaa);
        return aaa;
    }
}
