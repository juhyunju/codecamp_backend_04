import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    code: string;

    @Column()
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    // @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    region: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    @Field(() => String)
    role: string;

    @Column({ default: 0 })
    @Field(() => Int)
    point: number;
}
