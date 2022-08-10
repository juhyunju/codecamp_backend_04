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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createUser_input_1 = require("./dto/createUser.input");
const updateUser_input_1 = require("./dto/updateUser.input");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const users_service_1 = require("./users.service");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const common_1 = require("@nestjs/common");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    fetchLoginUser(context) {
        const email = context.req.user.email;
        return this.usersService.findLoginUser({ email });
    }
    fetchUsers() {
        return this.usersService.findAll();
    }
    fetchUser(context) {
        return "aaa";
    }
    async createUser(createUserInput) {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        return this.usersService.create(Object.assign({ hashedPassword }, createUserInput));
    }
    async updateUser(userCode, updateUserInput) {
        return this.usersService.update({ updateUserInput, userCode });
    }
    async deleteUser(userCode) {
        return this.usersService.delete({ userCode });
    }
    async updateUserPwd(newPwd, context) {
        console.log(context.req.user);
        const userId = context.req.user.id;
        const password = await bcrypt.hash(newPwd, 10);
        return this.usersService.updateUserPwd({ userId, password });
    }
    async deleteLoginUser(context) {
        const email = context.req.user.email;
        return this.usersService.deleteLoginUser({ email });
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "fetchLoginUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "fetchUsers", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "fetchUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("userCode")),
    __param(1, (0, graphql_1.Args)("updateUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateUser_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("userCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("newPwd")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUserPwd", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteLoginUser", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map