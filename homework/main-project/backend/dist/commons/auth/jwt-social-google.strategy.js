"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "google") {
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
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map