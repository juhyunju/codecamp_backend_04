import { Product } from "src/apis/products/entities/product.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class ProductDesc {
    @PrimaryGeneratedColumn("uuid")
    descCode: string;

    @JoinColumn()
    @OneToOne(() => Product)
    Product;
}
