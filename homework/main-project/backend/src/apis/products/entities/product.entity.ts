import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "src/apis/categories/entities/category.entity";
import { Image } from "src/apis/images/entities/image.entity";
import { Payment } from "src/apis/payment/entities/payment.entity";
import { User } from "src/apis/users/entities/user.entity";
import { ProductTag } from "src/apis/productsTags/entities/productTag.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    code: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column()
    @Field(() => String)
    region: string;

    @Column()
    @Field(() => String)
    desc: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @JoinColumn()
    @OneToOne(() => Image)
    @Field(() => Image)
    image: Image;

    @ManyToOne(() => Category)
    @Field(() => Category)
    category: Category;

    @ManyToOne(() => Payment)
    @Field(() => Payment)
    Payment;

    @ManyToOne(() => User)
    @Field(() => User)
    users: User[];

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[];
}
