import { Field, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";

@InputType()
export class CreateProductInput {
    @Field(() => String)
    desc: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    region: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => String)
    categoryCode: string;

    @Field(() => [String])
    productTags: string[];
}
