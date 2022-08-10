"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsMoudle = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const iamport_service_1 = require("../iamport/iamport.service");
const user_entity_1 = require("../users/entities/user.entity");
const payment_entity_1 = require("./entities/payment.entity");
const payments_resolver_1 = require("./payments.resolver");
const payments_service_1 = require("./payments.service");
let PaymentsMoudle = class PaymentsMoudle {
};
PaymentsMoudle = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                payment_entity_1.Payment,
                user_entity_1.User,
            ]),
        ],
        providers: [payments_resolver_1.PaymentsResolver, payments_service_1.PaymentsService, iamport_service_1.IamportService],
    })
], PaymentsMoudle);
exports.PaymentsMoudle = PaymentsMoudle;
//# sourceMappingURL=payments.module.js.map