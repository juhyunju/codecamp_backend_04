import { UsersService } from "../users/users.service";
import { AuthService } from "./auths.service";
import { IContext } from "src/commons/type/context";
export declare class AuthResolver {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(email: string, password: string, context: IContext): Promise<string>;
    restoreAccessToken(context: IContext): string;
}
