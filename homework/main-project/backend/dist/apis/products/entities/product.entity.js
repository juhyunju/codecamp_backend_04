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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_entity_1 = require("../../categories/entities/category.entity");
const image_entity_1 = require("../../images/entities/image.entity");
const payment_entity_1 = require("../../payment/entities/payment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const productTag_entity_1 = require("../../productsTags/entities/productTag.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => image_entity_1.Image),
    (0, graphql_1.Field)(() => image_entity_1.Image),
    __metadata("design:type", image_entity_1.Image)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category),
    (0, graphql_1.Field)(() => category_entity_1.Category),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment),
    (0, graphql_1.Field)(() => payment_entity_1.Payment),
    __metadata("design:type", Object)
], Product.prototype, "Payment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Array)
], Product.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => productTag_entity_1.ProductTag, (productTags) => productTags.products),
    (0, graphql_1.Field)(() => [productTag_entity_1.ProductTag]),
    __metadata("design:type", Array)
], Product.prototype, "productTags", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map