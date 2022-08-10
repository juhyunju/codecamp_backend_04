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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentsService = class PaymentsService {
    constructor(paymentsRepository, usersRepository, connection) {
        this.paymentsRepository = paymentsRepository;
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    async create({ impUid, amount, user: _user }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            const payment = this.paymentsRepository.create({
                impUid: impUid,
                amount: amount,
                user: _user,
                status: payment_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await queryRunner.manager.save(payment);
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { code: _user.code },
                lock: { mode: "pessimistic_write" },
            });
            const updatedUser = this.usersRepository.create(Object.assign(Object.assign({}, user), { point: user.point + amount }));
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
PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map