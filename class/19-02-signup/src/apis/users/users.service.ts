import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password, name, age }) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미등록'); // 이 방법도 있다.
    // if (user) throw new HttpException('이미등록된이메일', HttpStatus.CONFLICT);

    return await this.userRepository.save({ email, password, name, age });
  }
}
