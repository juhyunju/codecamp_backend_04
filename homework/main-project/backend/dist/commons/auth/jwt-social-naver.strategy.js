"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtNaverStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_naver_v2_1 = require("passport-naver-v2");
class JwtNaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_v2_1.Strategy, "naver") {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:3000/login/naver",
        });
    }
    validate(accessToken, refreshToken, profile) {
        console.log(profile);
        return {
            id: "이주현1",
            email: profile._json.response.email,
            name: profile._json.response.name,
            hashedPassword: "12341",
            phone: "01092481198",
            region: "수원",
            role: "왕",
        };
    }
}
exports.JwtNaverStrategy = JwtNaverStrategy;
//# sourceMappingURL=jwt-social-naver.strategy.js.map