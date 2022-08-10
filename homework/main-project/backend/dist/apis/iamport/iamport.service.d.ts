import { Repository, Connection } from "typeorm";
import { Payment } from "../payment/entities/payment.entity";
import { User } from "../users/entities/user.entity";
export declare class IamportService {
    private readonly paymentRepository;
    private readonly usersRepository;
    private readonly connection;
    constructor(paymentRepository: Repository<Payment>, usersRepository: Repository<User>, connection: Connection);
    getToken(): Promise<any>;
    getData({ token, impUid }: {
        token: any;
        impUid: any;
    }): Promise<any>;
    findOne({ impUid }: {
        impUid: any;
    }): Promise<Payment>;
    cancelCheck({ impUid }: {
        impUid: any;
    }): Promise<Payment>;
    cancel({ token, impUid, amount }: {
        token: any;
        impUid: any;
        amount: any;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    createCancel({ impUid, amount, user: _user }: {
        impUid: any;
        amount: any;
        user: any;
    }): Promise<Payment>;
}
