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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne({ email }) {
        return await this.userRepository.findOne({ where: { email: email } });
    }
    async findOneEmail({ email }) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findLoginUser({ email }) {
        return await this.userRepository.findOne({ where: { email: email } });
    }
    async create(_a) {
        var { hashedPassword: password } = _a, createUserInput = __rest(_a, ["hashedPassword"]);
        console.log(password, createUserInput);
        const user = await this.userRepository.findOne({
            where: { email: createUserInput.email },
        });
        if (user)
            throw new common_1.ConflictException("이미등록");
        return await this.userRepository.save(Object.assign(Object.assign({}, createUserInput), { password }));
    }
    async update({ userCode, updateUserInput }) {
        const myuser = await this.userRepository.findOne({
            where: { code: userCode },
        });
        const result = this.userRepository.save(Object.assign(Object.assign(Object.assign({}, myuser), { code: userCode }), updateUserInput));
        return result;
    }
    async updateUserPwd({ userId, password }) {
        const loginuser = await this.userRepository.findOne({
            where: { id: userId },
        });
        const result = await this.userRepository.save(Object.assign(Object.assign({}, loginuser), { id: userId, password }));
        console.log(result);
        return result;
    }
    async delete({ userCode }) {
        const result = await this.userRepository.softDelete({
            code: userCode,
        });
        return result.affected ? true : false;
    }
    async deleteLoginUser({ email }) {
        const result = await this.userRepository.softDelete({
            email: email,
        });
        return result.affected ? true : false;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map