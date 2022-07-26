import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @ManyToOne(() => ProductCategory) // N:1
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn() // 내가 기준이다.
  @OneToOne(() => ProductSaleslocation) // 1:1
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  // ManyToMany 다대다는 중간 테이블에 컬럼을 각 테이블에서 컬럼으로 만들어줘야 함
  @JoinTable() // 이래야 중간 테이블이 생김
  @ManyToMany(() => ProductTag, (productsTags) => productsTags.products) // 상대방에서 나를 뭐라고 부를까요~?
  @Field(() => [ProductTag])
  productTags: ProductTag[]; // 여러개가 들어가니깐 배열로 해줘야함
}
