import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    code: string;

    @Column()
    @Field(() => String)
    name: string;
}
