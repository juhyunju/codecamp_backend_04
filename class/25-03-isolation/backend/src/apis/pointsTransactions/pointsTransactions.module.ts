import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionsResolver } from './pointsTransactions.resolver';
import { PointTransactionsService } from './pointsTransactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction,
      User, //
    ]),
  ],
  providers: [
    PointTransactionsResolver, //
    PointTransactionsService,
  ],
})
export class PointTransactionsMoudle {}
