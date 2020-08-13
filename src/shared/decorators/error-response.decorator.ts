import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'
import ErrorDto from '@/models/error.dto'

export default function ApiErrorResponse() {
  return applyDecorators(
    ApiUnauthorizedResponse({ description: '沒有權限', type: ErrorDto }),
    ApiBadRequestResponse({ description: '前端參數錯誤', type: ErrorDto }),
    ApiInternalServerErrorResponse({ description: '伺服器錯誤', type: ErrorDto }),
  )
}
