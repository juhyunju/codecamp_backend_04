import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productsSaleslocationsRepository.save({
      ...productSaleslocation,
    });

    // productTags // ["#전자제품", "#영등포", "#컴퓨터"]
    const result2 = []; // [{ name: ..., id: ... }, { name: ..., id: ... }, ...]
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productsTagsRepository.findOne({
        where: { name: tagname },
      });

      // 기존에 태그가 존재한다면
      if (prevTag) {
        result2.push(prevTag);

        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productsTagsRepository.save({
          name: tagname,
        });
        result2.push(newTag);
      }
    }

    const result3 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      productCategory: { id: productCategoryId },
      productTags: result2,
    });

    return result3;
  }

  async update({ productId, updateProductInput }) {
    // 수정할때만 사용
    // const result = this.productsRepository.update({ id: productId }, { ...updateProductInput });

    // 수정후 결과값까지 받을때 사용
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    const result = this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productsRepository.findOne({
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
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }
}
