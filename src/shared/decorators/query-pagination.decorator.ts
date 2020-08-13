import { ApiQuery } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

export default function ApiQueryPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      description: '當前頁數 (從 1 開始，沒給預設是 1)',
      example: 1,
      required: false,
    }),
    ApiQuery({
      name: 'pageSize',
      description: '每頁筆數 (沒給預設 10)',
      example: 10,
      required: false,
    }),
    ApiQuery({
      name: 'keyword',
      description: '關鍵字',
      example: 'mama.whowho',
      required: false,
    }),
  )
}
