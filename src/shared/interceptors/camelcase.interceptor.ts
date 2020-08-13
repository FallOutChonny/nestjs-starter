import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { is, map as Rmap, keys, compose } from 'ramda'
import camelCase from '@/utils/camelcase'

@Injectable()
export class camelCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const snakeCaseMapper = compose(
          Rmap((key: string) => ({ [camelCase(key)]: value[key] })),
          keys,
        )

        if (is(Array, value)) {
          return value.map((v) => snakeCaseMapper(v))
        }
        return snakeCaseMapper(value)
      }),
    )
  }
}
