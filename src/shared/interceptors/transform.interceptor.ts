import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}

/**
 * 將回傳的 JSON 轉成有 data 包覆的格式
 *
 * 單物件資料，原本是
 * ```
 * { name: 'Chonny' }
 * ```
 * 會被轉為
 * ```
 * { data: { name: 'Chonny' } }
 * ```
 *
 * 清單資料
 * ```
 * {
 *   data: {
 *     data: [],
 *     total: 0,
 *     page: 1,
 *     pageSize: 10
 *   }
 * }
 * ```
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })))
  }
}
