import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository, Connection } from "typeorm";
import {
    Payment,
    POINT_TRANSACTION_STATUS_ENUM,
} from "../payment/entities/payment.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class IamportService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly connection: Connection
    ) {}
    async getToken() {
        const getToKen = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: "7200550407348763", // REST API키
                imp_secret:
                    "suFUnNOIl1oPBSARhOLNzvu3kvWdUqD8nVq0vXPRFSAXZFbeWRxdkGIIG6fz1xjHVROPrwS7lc4UzXWu", // REST API Secret
            },
        });
        return getToKen.data.response.access_token;
    }

    async getData({ token, impUid }) {
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
            method: "get", // GET method
            headers: { Authorization: token }, // 인증 토큰 Authorization header에 추가
        });
        const paymentData = getPaymentData.data.response; // 조회한 결제 정보
        console.log(getPaymentData);
        return paymentData;
    }

    async findOne({ impUid }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const check = await queryRunner.manager.findOne(Payment, {
                where: { impUid: impUid },
                lock: { mode: "pessimistic_write" },
            });
            await queryRunner.commitTransaction();
            return check;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async cancelCheck({ impUid }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const payment = await queryRunner.manager.findOne(Payment, {
                where: { impUid: impUid, status: "CANCEL" },
                lock: { mode: "pessimistic_write" },
            });
            await queryRunner.commitTransaction();
            return payment;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async cancel({ token, impUid, amount }) {
        const getCancelData = await axios({
            url: "https://api.iamport.kr/payments/cancel",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: token, // 아임포트 서버로부터 발급받은 엑세스 토큰
            },
            data: {
                imp_uid: impUid,
                amount: amount, // imp_uid를 환불 `unique key`로 입력
            },
        });
        return getCancelData; // 환불 결과
    }

    async createCancel({ impUid, amount, user: _user }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const payment = this.paymentRepository.create({
                impUid: impUid,
                amount: -amount,
                user: _user,
                status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
            });
            await queryRunner.manager.save(payment);
            const user = await queryRunner.manager.findOne(User, {
                where: { code: _user.code },
                lock: { mode: "pessimistic_write" },
            });
            const updatedUser = this.usersRepository.create({
                ...user,
                point: user.point - amount,
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
