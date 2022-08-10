import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./apis/products/product.module";
import { CategoriesModule } from "./apis/categories/catagories.module";
import { UsersModule } from "./apis/users/users.module";
import { AuthModule } from "./apis/auths/auths.module";
import { ConfigModule } from "@nestjs/config";
import { PaymentsMoudle } from "./apis/payment/payments.module";
import { FilesModule } from "./apis/files/files.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ProductModule,
        PaymentsMoudle,
        CategoriesModule,
        UsersModule,
        AuthModule,
        FilesModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
            context: ({ req, res }) => ({ req, res }), // 추가
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as "mysql",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.{js,ts}"],
            synchronize: true,
            logging: true,
            retryAttempts: 30, // 30번 더 접속 시도해라 !!
        }),
    ],
})
export class AppModule {}
