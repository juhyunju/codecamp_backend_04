import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
@Controller()
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService //
    ) {}
    @Get("/login/google")
    @UseGuards(AuthGuard("google"))
    async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
        this.authService.sLogin(req, res);
    }

    @Get("/login/kakao")
    @UseGuards(AuthGuard("kakao"))
    async loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
        this.authService.sLogin(req, res);
    }

    @Get("/login/naver")
    @UseGuards(AuthGuard("naver"))
    async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
        this.authService.sLogin(req, res);
    }
}
