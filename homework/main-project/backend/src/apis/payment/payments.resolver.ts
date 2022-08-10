import {
    ConflictException,
    UnprocessableEntityException,
    UseGuards,
} from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Payment } from "./entities/payment.entity";
import { PaymentsService } from "./payments.service";
import { IamportService } from "../iamport/iamport.service";

@Resolver()
export class PaymentsResolver {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly iamportService: IamportService
    ) {}

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Payment)
    async createPayment(
        @Args("impUid") impUid: string,
        @Args({ name: "amount", type: () => Int }) amount: number,
        @Context() context: IContext
    ) {
        const user = context.req.user;
        const token = await this.iamportService.getToken();
        const getData = await this.iamportService.getData({ token, impUid });

        // if (getData.imp_uid !== impUid) {
        //     throw new UnprocessableEntityException("유효하지 않아유");
        // }

        const check = await this.iamportService.findOne({ impUid });
        if (check) throw new ConflictException("이미 결제됨!");
        return this.paymentsService.create({ impUid, amount, user });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Payment)
    async cancelPayment(
        @Args("impUid") impUid: string,
        @Args({ name: "amount", type: () => Int }) amount: number,
        @Context() context: IContext
    ) {
        const user = context.req.user;
        const payment =  await this.iamportService.cancelCheck({ impUid});
        if (payment) {
            throw new UnprocessableEntityException("이미 취소됨!");
        }
        const token = await this.iamportService.getToken();
        await this.iamportService.cancel({
            token,
            impUid,
            amount,
        });
        return this.iamportService.createCancel({ impUid, amount, user });
    }
}
