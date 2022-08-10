import { Strategy } from "passport-naver-v2";
declare const JwtNaverStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtNaverStrategy extends JwtNaverStrategy_base {
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
