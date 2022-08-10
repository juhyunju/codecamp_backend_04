import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    findOneEmail({ email }: {
        email: any;
    }): Promise<User>;
    findLoginUser({ email }: {
        email: any;
    }): Promise<User>;
    create({ hashedPassword: password, ...createUserInput }: {
        [x: string]: any;
        hashedPassword: any;
    }): Promise<{
        password: any;
    } & User>;
    update({ userCode, updateUserInput }: {
        userCode: any;
        updateUserInput: any;
    }): Promise<any>;
    updateUserPwd({ userId, password }: {
        userId: any;
        password: any;
    }): Promise<{
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
    delete({ userCode }: {
        userCode: any;
    }): Promise<boolean>;
    deleteLoginUser({ email }: {
        email: any;
    }): Promise<boolean>;
}
