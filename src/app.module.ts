import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PaginationMiddleware from '@/middlewares/pagination.middleware'
import UserModule from '@user/user.module'
import AuthModule from '@auth/auth.module'
import RoleModule from '@role/role.module'
import config from './app.config'

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    TypeOrmModule.forRoot({
      ...config.ormconfig,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      logging: false,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/db/migrations/*.ts'],
      cli: {
        migrationsDir: 'dist/db/migrations',
      },
    }),
  ],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/roles', method: RequestMethod.GET },
      )
  }
}
