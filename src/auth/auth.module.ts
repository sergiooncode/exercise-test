import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      //secret: process.env.JWT_SECRET_KEY,
      secret: 'fd3t&e@#w8p!12wkhm2cu&%o0ea3j@w42fn1x+lg(%t&%q#9l',
      signOptions: {
        //expiresIn: process.env.JWT_EXPIRATION_TIME,
        expiresIn: '30m',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
