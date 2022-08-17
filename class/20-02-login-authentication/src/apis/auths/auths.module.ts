import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auths.resolver';
import { AuthService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]), //
  ],
  providers: [AuthResolver, AuthService, UsersService],
})
export class AuthModule {}
