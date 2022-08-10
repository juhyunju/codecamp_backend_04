import { UsersService } from "../users/users.service";
import { AuthService } from "./auths.service";
import { Request, Response } from "express";
interface IOAuthUser {
    user: {
        email: string;
        hashedPassword: string;
        name: string;
        age: number;
        id: string;
        phone: string;
    };
}
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginKakao(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginNaver(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
