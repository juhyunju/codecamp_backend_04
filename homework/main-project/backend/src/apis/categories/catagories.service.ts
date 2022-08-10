import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ) {}

    create({ name }) {
        // DB에 카테고리 등록
        const result = this.categoriesRepository.save({ name: name });
        console.log(result); // { id: qjfjqwdkj-qwlk12, name: 의류 }
        return result;
    }
}
