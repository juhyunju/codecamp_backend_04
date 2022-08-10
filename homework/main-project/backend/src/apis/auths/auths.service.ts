import { Injectable, Req, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
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
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService //
    ) {}

    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            { email: user.email, sub: user.code },
            { secret: "myRefreshKey", expiresIn: "2w" }
        );

        res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; path=/;`); // 개발환경
    }

    getAccessToken({ user }) {
        return this.jwtService.sign(
            { email: user.email, sub: user.code },
            { secret: "myAccessKey", expiresIn: "1w" }
        );
    }
    async sLogin(req, res) {
        let user = await this.usersService.findOne({ email: req.user.email });
        if (!user)
            user = await this.usersService.create({
                ...req.user,
            });
        this.setRefreshToken({ user, res });
        res.redirect(
            "http://localhost:5501/homework/main-project/frontend/login/index.html"
        );
    }
}
