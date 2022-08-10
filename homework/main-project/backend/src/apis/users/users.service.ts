import {
    ConflictException,
    ConsoleLogger,
    HttpException,
    HttpStatus,
    Injectable,
    Query,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne({ email }) {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    async findOneEmail({ email }) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findLoginUser({ email }) {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    // async checkUser({ userCode });

    async create({ hashedPassword: password, ...createUserInput }) {
        console.log(password, createUserInput);
        const user = await this.userRepository.findOne({
            where: { email: createUserInput.email },
        });
        if (user) throw new ConflictException("이미등록");
        return await this.userRepository.save({ ...createUserInput, password });
    }

    async update({ userCode, updateUserInput }) {
        const myuser = await this.userRepository.findOne({
            where: { code: userCode },
        });

        const result = this.userRepository.save({
            ...myuser,
            code: userCode,
            ...updateUserInput,
        });
        return result;
    }

    async updateUserPwd({ userId, password }) {
        const loginuser = await this.userRepository.findOne({
            where: { id: userId },
        });
        const result = await this.userRepository.save({
            ...loginuser,
            id: userId,
            password,
        });
        console.log(result);
        return result;
    }

    async delete({ userCode }) {
        const result = await this.userRepository.softDelete({
            code: userCode,
        });
        return result.affected ? true : false;
    }

    async deleteLoginUser({ email }) {
        const result = await this.userRepository.softDelete({
            email: email,
        });
        return result.affected ? true : false;
    }
}
