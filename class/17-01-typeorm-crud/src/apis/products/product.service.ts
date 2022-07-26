import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRespository.find();
  }

  findOne(productId) {
    return this.productRespository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    const result = await this.productRespository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    // 수정할 때만
    // this.productRespository.update({ id: productId },{...updateProductInput});

    // 수정후 결과값까지 받을 때 사용
    const myproduct = await this.productRespository.findOne({
      where: { id: productId },
    });

    const result = this.productRespository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput, // 기존거 덮어 씀 그래서 사용
    });
    return result;
  }

  async checksoldout({ productId }) {
    const product = await this.productRespository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout) {
      throw new UnprocessableEntityException('^_^');
    }
    // if (product.isSoldout) {
    //   throw new HttpException('^_^', HttpStatus.UNPROCESSABLE_ENTITY);
    // }
  }
}
