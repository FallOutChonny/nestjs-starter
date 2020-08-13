import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common'
import { tap } from 'rxjs/operators'
const consola = require('consola')

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now()

    const req = context.switchToHttp().getRequest()
    const { statusCode } = context.switchToHttp().getResponse()

    return next.handle().pipe(
      tap(() => {
        const end = Date.now()
        consola.success(req.method, req.originalUrl, statusCode, `${end - start} ms`)
      }),
    )
  }
}
