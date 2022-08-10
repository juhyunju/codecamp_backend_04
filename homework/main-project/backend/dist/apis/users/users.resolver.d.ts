import { CreateUserInput } from "./dto/createUser.input";
import { UpdateUserInput } from "./dto/updateUser.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchLoginUser(context: any): Promise<User>;
    fetchUsers(): Promise<User[]>;
    fetchUser(context: any): string;
    createUser(createUserInput: CreateUserInput): Promise<{
        password: any;
    } & User>;
    updateUser(userCode: string, updateUserInput: UpdateUserInput): Promise<any>;
    deleteUser(userCode: string): Promise<boolean>;
    updateUserPwd(newPwd: string, context: any): Promise<{
        id: any;
        password: any;
        code: string;
        name: string;
        email: string;
        phone: string;
        region: string;
        deletedAt: Date;
        role: string;
        point: number;
    } & User>;
    deleteLoginUser(context: any): Promise<boolean>;
}
