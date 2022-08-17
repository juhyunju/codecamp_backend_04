import { Args, Int, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(@Context() context: any) {
    console.log(context.req.user);
    // console.log('fetchUser 실행완료 !! ');
    return 'faaaasdad 실행';
  }

  @Mutation(() => User)
  async createUser(
    @Context()
    @Args('email')
    email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
    @Context() context: any,
  ) {
    console.log(context.req.email);
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, hashedPassword, name, age });
  }
}
