export interface IUser {
    user: {
        email: string;
        code: string;
    };
}
export interface IContext {
    req?: Request & IUser;
    res?: Response;
}
