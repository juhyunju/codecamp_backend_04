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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const auths_service_1 = require("./auths.service");
let AuthController = class AuthController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async loginGoogle(req, res) {
        this.authService.sLogin(req, res);
    }
    async loginKakao(req, res) {
        this.authService.sLogin(req, res);
    }
    async loginNaver(req, res) {
        this.authService.sLogin(req, res);
    }
};
__decorate([
    (0, common_1.Get)("/login/google"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Get)("/login/kakao"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("kakao")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginKakao", null);
__decorate([
    (0, common_1.Get)("/login/naver"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("naver")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginNaver", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auths_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auths.controller.js.map