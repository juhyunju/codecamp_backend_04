import { Category } from "./entities/category.entity";
import { CategoriesService } from "./catagories.service";
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(name: string): Promise<{
        name: any;
    } & Category>;
}
