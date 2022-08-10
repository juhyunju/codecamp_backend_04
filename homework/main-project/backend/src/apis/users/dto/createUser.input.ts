import { Field, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    id;

    @Field(() => String)
    name: string;

    @Field(() => String)
    region: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    role: string;

    @Field(() => String)
    password: string;
}
