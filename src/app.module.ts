import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserModule from './user/user.module'
import AuthModule from './auth/auth.module'
import config from './app.config'

@Module({
  imports: [
    // ...requireDefaults('*/*.module.ts'),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(config.ormconfig),
  ],
})
export default class AppModule {
  // configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
  //   consumer.apply(cookieParser(), ...middleware).forRoutes('/')
  // }
}
