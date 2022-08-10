import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoriesResolver } from "./catagories.resolver";
import { CategoriesService } from "./catagories.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Category, //
        ]),
    ],
    providers: [
        CategoriesResolver, //
        CategoriesService,
    ],
})
export class CategoriesModule {}
