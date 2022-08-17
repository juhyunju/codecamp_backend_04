import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionsService } from './pointsTransactions.service';

@Resolver()
export class PointTransactionsResolver {
  constructor(
    private readonly pointTransactionsService: PointTransactionsService,
  ) {}
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    console.log(user);
    return this.pointTransactionsService.create({ impUid, amount, user });
  }
}
