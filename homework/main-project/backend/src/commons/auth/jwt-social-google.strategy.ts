// jwt-refresh.strategy.ts

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/login/google",
            scope: ["email", "profile"],
        });
    }

    validate(accessToken, refreshToken, profile) {
        console.log(profile);
        return {
            id: profile.id,
            phone: "01092481198",
            email: profile.emails[0].value,
            name: profile.displayName,
            age: 0,
            hashedPassword: "1234",
            region: "수원",
            role: "왕",
        };
    }
}
