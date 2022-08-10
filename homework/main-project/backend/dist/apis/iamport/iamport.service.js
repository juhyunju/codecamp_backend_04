"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../payment/entities/payment.entity");
const user_entity_1 = require("../users/entities/user.entity");
let IamportService = class IamportService {
    constructor(paymentRepository, usersRepository, connection) {
        this.paymentRepository = paymentRepository;
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    async getToken() {
        const getToKen = await (0, axios_1.default)({
            url: "https://api.iamport.kr/users/getToken",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "7200550407348763",
                imp_secret: "suFUnNOIl1oPBSARhOLNzvu3kvWdUqD8nVq0vXPRFSAXZFbeWRxdkGIIG6fz1xjHVROPrwS7lc4UzXWu",
            },
        });
        return getToKen.data.response.access_token;
    }
    async getData({ token, impUid }) {
        const getPaymentData = await (0, axios_1.default)({
            url: `https://api.iamport.kr/payments/${impUid}`,
            method: "get",
            headers: { Authorization: token },
        });
        const paymentData = getPaymentData.data.response;
        console.log(getPaymentData);
        return paymentData;
    }
    async findOne({ impUid }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const check = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { impUid: impUid },
                lock: { mode: "pessimistic_write" },
            });
            await queryRunner.commitTransaction();
            return check;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async cancelCheck({ impUid }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const payment = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { impUid: impUid, status: "CANCEL" },
                lock: { mode: "pessimistic_write" },
            });
            await queryRunner.commitTransaction();
            return payment;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async cancel({ token, impUid, amount }) {
        const getCancelData = await (0, axios_1.default)({
            url: "https://api.iamport.kr/payments/cancel",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            data: {
                imp_uid: impUid,
                amount: amount,
            },
        });
        return getCancelData;
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
                status: payment_entity_1.POINT_TRANSACTION_STATUS_ENUM.CANCEL,
            });
            await queryRunner.manager.save(payment);
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { code: _user.code },
                lock: { mode: "pessimistic_write" },
            });
            const updatedUser = this.usersRepository.create(Object.assign(Object.assign({}, user), { point: user.point - amount }));
            await queryRunner.manager.save(updatedUser);
            await queryRunner.commitTransaction();
            return payment;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
IamportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], IamportService);
exports.IamportService = IamportService;
//# sourceMappingURL=iamport.service.js.map