import { Args, Int, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/createUser.input";
import { UpdateUserInput } from "./dto/updateUser.input";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { UsersService } from "./users.service";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    fetchLoginUser(@Context() context: any) {
        const email = context.req.user.email;
        return this.usersService.findLoginUser({ email });
    }

    @Query(() => [User])
    fetchUsers() {
        return this.usersService.findAll();
    }
    @Query(() => String)
    @UseGuards(GqlAuthAccessGuard)
    fetchUser(@Context() context: any) {
        return "aaa";
    }
    @Mutation(() => User)
    async createUser(
        @Args("createUserInput") createUserInput: CreateUserInput
    ) {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        return this.usersService.create({
            hashedPassword,
            ...createUserInput, //
        });
    }

    @Mutation(() => User)
    async updateUser(
        @Args("userCode") userCode: string,
        @Args("updateUserInput") updateUserInput: UpdateUserInput
    ) {
        return this.usersService.update({ updateUserInput, userCode });
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args("userCode") userCode: string) {
        return this.usersService.delete({ userCode });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => User)
    async updateUserPwd(
        @Args("newPwd") newPwd: string,
        @Context() context: any
    ) {
        console.log(context.req.user);
        const userId = context.req.user.id;
        const password = await bcrypt.hash(newPwd, 10);
        return this.usersService.updateUserPwd({ userId, password });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    async deleteLoginUser(@Context() context: any) {
        const email = context.req.user.email;
        return this.usersService.deleteLoginUser({ email });
    }
}
