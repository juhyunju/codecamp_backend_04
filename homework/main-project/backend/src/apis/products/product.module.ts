import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { ProductTag } from "../productsTags/entities/productTag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product, //
            Category,
            ProductTag,
        ]),
    ],
    providers: [
        // providers = 의존성주입
        ProductResolver, //
        ProductService,
    ],
})
export class ProductModule {}
