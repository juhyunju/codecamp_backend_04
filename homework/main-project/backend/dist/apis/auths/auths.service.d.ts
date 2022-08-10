import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    setRefreshToken({ user, res }: {
        user: any;
        res: any;
    }): void;
    getAccessToken({ user }: {
        user: any;
    }): string;
    sLogin(req: any, res: any): Promise<void>;
}
