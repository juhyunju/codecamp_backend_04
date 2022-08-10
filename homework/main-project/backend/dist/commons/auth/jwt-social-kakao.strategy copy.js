"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtKakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
class JwtKakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, "kakao") {
    constructor() {
        super({
            clientID: "4d17aed65637546eb4a1ac85c1bdb5ea",
            clientScret: "GT9JnovG4rNAh8xaoyY30hmUhlavE6d0",
            callbackURL: "http://127.0.0.1:3000/login/kakao",
            scope: ["profile_nickname"],
        });
    }
    validate(accessToken, refreshToken, profile) {
        return {
            id: "이주현2",
            email: profile._json.kakao_account.email,
            name: profile.username,
            hashedPassword: "12341",
            phone: "01092481198",
            region: "수원",
            role: "왕",
        };
    }
}
exports.JwtKakaoStrategy = JwtKakaoStrategy;
//# sourceMappingURL=jwt-social-kakao.strategy%20copy.js.map