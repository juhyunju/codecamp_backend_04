import { Repository, Connection } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Payment } from "./entities/payment.entity";
export declare class PaymentsService {
    private readonly paymentsRepository;
    private readonly usersRepository;
    private readonly connection;
    constructor(paymentsRepository: Repository<Payment>, usersRepository: Repository<User>, connection: Connection);
    create({ impUid, amount, user: _user }: {
        impUid: any;
        amount: any;
        user: any;
    }): Promise<Payment>;
}
