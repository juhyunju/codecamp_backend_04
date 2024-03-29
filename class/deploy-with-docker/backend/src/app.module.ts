import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { ProductsModule } from './apis/products/products.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auths/auths.module';
import { PointTransactionsMoudle } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { FilesModule } from './apis/files/files.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    BoardsModule,
    PointTransactionsMoudle,
    ProductsModule,
    ProductsCategoriesModule,
    PaymentMoudle,
    UsersModule,
    AuthModule,
    FilesModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.84.16.3',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myserver',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
