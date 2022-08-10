import { Strategy } from "passport-kakao";
declare const JwtKakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtKakaoStrategy extends JwtKakaoStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, profile: any): {
        id: string;
        email: any;
        name: any;
        hashedPassword: string;
        phone: string;
        region: string;
        role: string;
    };
}
export {};
