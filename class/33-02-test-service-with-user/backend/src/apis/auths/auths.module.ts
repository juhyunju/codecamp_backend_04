import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auths.resolver';
import { AuthService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { AuthController } from './auths.controller';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]), //
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    AuthResolver,
    AuthService,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
