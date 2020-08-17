import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Response, Request } from 'express'
import ValidationException from '@/exceptions/validation.exception'

@Catch(ValidationException)
export default class ValidationFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const request: Request = ctx.getRequest()

    return response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.validationErrors,
    })
  }
}
