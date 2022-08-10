// jwt-refresh.strategy.ts

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver-v2";

export class JwtNaverStrategy extends PassportStrategy(Strategy, "naver") {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:3000/login/naver",
            // scope: ["profile_nickname"],
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
