import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & Category>;
}
