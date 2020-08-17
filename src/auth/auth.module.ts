import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import UserModule from '@user/user.module'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import config from '../app.config'

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'email',
      session: false,
    }),
    JwtModule.register({
      secret: config.get('SECRETKEY') || 'SECRETKEY',
      signOptions: {
        expiresIn: config.get('EXPIRESIN'),
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export default class AuthModule {}
