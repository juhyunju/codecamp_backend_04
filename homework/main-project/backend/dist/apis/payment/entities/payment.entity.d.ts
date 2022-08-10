import { User } from "src/apis/users/entities/user.entity";
export declare enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = "PAYMENT",
    CANCEL = "CANCEL"
}
export declare class Payment {
    id: string;
    impUid: string;
    amount: number;
    status: string;
    user: User;
    cratedAt: Date;
}
