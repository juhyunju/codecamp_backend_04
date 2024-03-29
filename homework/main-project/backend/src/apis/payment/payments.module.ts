import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IamportService } from "../iamport/iamport.service";
import { User } from "../users/entities/user.entity";
import { Payment } from "./entities/payment.entity";
import { PaymentsResolver } from "./payments.resolver";
import { PaymentsService } from "./payments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Payment,
            User, //
        ]),
    ],
    providers: [PaymentsResolver, PaymentsService, IamportService],
})
export class PaymentsMoudle {}
