import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserModule from '@user/user.module'
import AuthModule from '@auth/auth.module'
import HttpExceptionFilter from '@/interceptors/http-exception.interceptor'
import config from './app.config'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...config.ormconfig,
      autoLoadEntities: true,
      migrationsRun: false,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/db/migrations/*.ts'],
      cli: {
        migrationsDir: 'dist/db/migrations',
      },
    }),
  ],
})
export default class AppModule {
  // configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
  //   consumer.apply(cookieParser(), ...middleware).forRoutes('/')
  // }
}
