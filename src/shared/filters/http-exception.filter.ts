import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Catch,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { pathOr } from 'ramda'
const consola = require('consola')

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const request: Request = ctx.getRequest()
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    consola.error(request.method, request.originalUrl, status)
    consola.log(exception.stack)

    const errorResponse = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? pathOr(exception.message, ['message', 'error'], exception) || null
          : 'Internal server error',
    }

    response.status(status).json(errorResponse)
  }
}
