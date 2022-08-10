import { IContext } from "src/commons/type/context";
import { Payment } from "./entities/payment.entity";
import { PaymentsService } from "./payments.service";
import { IamportService } from "../iamport/iamport.service";
export declare class PaymentsResolver {
    private readonly paymentsService;
    private readonly iamportService;
    constructor(paymentsService: PaymentsService, iamportService: IamportService);
    createPayment(impUid: string, amount: number, context: IContext): Promise<Payment>;
    cancelPayment(impUid: string, amount: number, context: IContext): Promise<Payment>;
}
