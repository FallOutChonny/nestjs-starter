import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export default class PaginationMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: () => void) {
    const limit = +req.query.pageSize || 10
    const page = (+req.query.page || 1) - 1

    req.query.take = String(limit)
    req.query.skip = String(page * limit)
    next()
  }
}
