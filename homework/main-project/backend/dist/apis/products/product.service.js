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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productTag_entity_1 = require("../productsTags/entities/productTag.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, productTagRepository) {
        this.productRepository = productRepository;
        this.productTagRepository = productTagRepository;
    }
    async findAll() {
        return await this.productRepository.find({
            relations: ["category", "productTags"],
        });
    }
    async findOne({ productId }) {
        return await this.productRepository.findOne({
            where: { code: productId },
            relations: ["category", "productTags"],
        });
    }
    async findProductsWithDeleted() {
        return await this.productRepository.find({
            withDeleted: true,
            relations: ["category", "productTags"],
        });
    }
    async create({ createProductInput }) {
        const { categoryCode, productTags } = createProductInput, product = __rest(createProductInput, ["categoryCode", "productTags"]);
        const result2 = [];
        for (let i = 0; i < productTags.length; i++) {
            const tagname = productTags[i].replace("#", "");
            const prevTag = await this.productTagRepository.findOne({
                where: { name: tagname },
            });
            if (prevTag) {
                result2.push(prevTag);
            }
            else {
                const newTag = await this.productTagRepository.save({
                    name: tagname,
                });
                result2.push(newTag);
            }
        }
        const result = await this.productRepository.save(Object.assign(Object.assign({}, product), { category: { code: categoryCode }, productTags: result2 }));
        return result;
    }
    async update({ productId, updateProductInput }) {
        const myproduct = await this.productRepository.findOne({
            where: { code: productId },
        });
        const result = this.productRepository.save(Object.assign(Object.assign(Object.assign({}, myproduct), { code: productId }), updateProductInput));
        return result;
    }
    async checkresion({ productId }) {
        const product = await this.productRepository.findOne({
            where: { code: productId },
        });
        if (product.region !== "수원") {
            throw new common_1.UnprocessableEntityException("너무멀어 돌아가!");
        }
    }
    async delete({ productId }) {
        const result = await this.productRepository.softDelete({
            code: productId,
        });
        return result.affected ? true : false;
    }
    async restore({ productId }) {
        const result = await this.productRepository.restore({
            code: productId,
        });
        return result.affected ? true : false;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productTag_entity_1.ProductTag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map