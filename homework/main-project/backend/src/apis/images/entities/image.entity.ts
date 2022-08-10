import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    code: string;

    @Column()
    @Field()
    url: string;

    @Column()
    @Field()
    productCode: string;
}
