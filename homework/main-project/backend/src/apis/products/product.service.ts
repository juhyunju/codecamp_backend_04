import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductTag } from "../productsTags/entities/productTag.entity";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductTag)
        private readonly productTagRepository: Repository<ProductTag>
    ) {}

    async findAll() {
        return await this.productRepository.find({
            relations: ["category", "productTags"],
        });
    }
    async findOne({ productId }) {
        return await this.productRepository.findOne({
            where: { code: productId },
            relations: ["category", "productTags"],
        });
    }

    async findProductsWithDeleted() {
        return await this.productRepository.find({
            withDeleted: true,
            relations: ["category", "productTags"],
        });
    }

    async create({ createProductInput }) {
        const { categoryCode, productTags, ...product } = createProductInput;

        const result2 = [];
        for (let i = 0; i < productTags.length; i++) {
            const tagname = productTags[i].replace("#", "");

            // 이미 등록된 태그인지 확인해보기
            const prevTag = await this.productTagRepository.findOne({
                where: { name: tagname },
            });

            // 기존에 태그가 존재한다면
            if (prevTag) {
                result2.push(prevTag);

                // 기존에 태그가 없었다면
            } else {
                const newTag = await this.productTagRepository.save({
                    name: tagname,
                });
                result2.push(newTag);
            }
        }

        const result = await this.productRepository.save({
            ...product,
            category: { code: categoryCode },
            productTags: result2,
        });

        return result;
    }

    async update({ productId, updateProductInput }) {
        // 수정할 때만
        // this.productRepository.update({ id: productId },{...updateProductInput});

        // 수정후 결과값까지 받을 때 사용
        const myproduct = await this.productRepository.findOne({
            where: { code: productId },
        });

        const result = this.productRepository.save({
            ...myproduct,
            code: productId,
            ...updateProductInput, // 기존거 덮어 씀 그래서 사용
        });
        return result;
    }

    async checkresion({ productId }) {
        const product = await this.productRepository.findOne({
            where: { code: productId },
        });

        if (product.region !== "수원") {
            throw new UnprocessableEntityException("너무멀어 돌아가!");
        }
    }

    async delete({ productId }) {
        const result = await this.productRepository.softDelete({
            code: productId,
        }); // 다른 것으로도 삭제 가능
        return result.affected ? true : false;
    }

    async restore({ productId }) {
        const result = await this.productRepository.restore({
            code: productId,
        });
        return result.affected ? true : false;
    }
}
