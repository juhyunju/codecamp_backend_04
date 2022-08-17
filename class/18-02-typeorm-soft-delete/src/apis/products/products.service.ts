import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // const result = this.productRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      productCategory: { id: productCategoryId },
    });

    return result2;
  }

  async update({ productId, updateProductInput }) {
    // 수정할때만 사용
    // const result = this.productRepository.update({ id: productId }, { ...updateProductInput });

    // 수정후 결과값까지 받을때 사용
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }
}
