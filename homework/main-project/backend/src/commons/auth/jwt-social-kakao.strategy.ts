// jwt-refresh.strategy.ts

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

export class JwtKakaoStrategy extends PassportStrategy(Strategy, "kakao") {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            callbackURL: "http://127.0.0.1:3000/login/kakao",
            scope: ["profile_nickname"],
        });
    }

    validate(accessToken, refreshToken, profile) {
        console.log(profile);
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
