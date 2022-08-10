import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from "typeorm";
import { User } from "../users/entities/user.entity";
import {
    Payment,
    POINT_TRANSACTION_STATUS_ENUM,
} from "./entities/payment.entity";

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentsRepository: Repository<Payment>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly connection: Connection
    ) {}

    async create({ impUid, amount, user: _user }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();

        // ============== transaction 시작!! ==============
        await queryRunner.startTransaction("SERIALIZABLE");
        // ===============================================
        try {
            const payment = this.paymentsRepository.create({
                impUid: impUid,
                amount: amount,
                user: _user,
                status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await queryRunner.manager.save(payment);

            const user = await queryRunner.manager.findOne(User, {
                where: { code: _user.code },
                lock: { mode: "pessimistic_write" },
            });
            const updatedUser = this.usersRepository.create({
                ...user,
                point: user.point + amount,
            });
            await queryRunner.manager.save(updatedUser);

            await queryRunner.commitTransaction();

            return payment;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
