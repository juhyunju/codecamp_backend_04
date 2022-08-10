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
exports.PaymentsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const payment_entity_1 = require("./entities/payment.entity");
const payments_service_1 = require("./payments.service");
const iamport_service_1 = require("../iamport/iamport.service");
let PaymentsResolver = class PaymentsResolver {
    constructor(paymentsService, iamportService) {
        this.paymentsService = paymentsService;
        this.iamportService = iamportService;
    }
    async createPayment(impUid, amount, context) {
        const user = context.req.user;
        const token = await this.iamportService.getToken();
        const getData = await this.iamportService.getData({ token, impUid });
        const check = await this.iamportService.findOne({ impUid });
        if (check)
            throw new common_1.ConflictException("이미 결제됨!");
        return this.paymentsService.create({ impUid, amount, user });
    }
    async cancelPayment(impUid, amount, context) {
        const user = context.req.user;
        const payment = await this.iamportService.cancelCheck({ impUid });
        if (payment) {
            throw new common_1.UnprocessableEntityException("이미 취소됨!");
        }
        const token = await this.iamportService.getToken();
        await this.iamportService.cancel({
            token,
            impUid,
            amount,
        });
        return this.iamportService.createCancel({ impUid, amount, user });
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)("impUid")),
    __param(1, (0, graphql_1.Args)({ name: "amount", type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "createPayment", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)("impUid")),
    __param(1, (0, graphql_1.Args)({ name: "amount", type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "cancelPayment", null);
PaymentsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        iamport_service_1.IamportService])
], PaymentsResolver);
exports.PaymentsResolver = PaymentsResolver;
//# sourceMappingURL=payments.resolver.js.map