import { ApiProperty } from '@nestjs/swagger'

/**
 * 從前端傳來的 Query 參數是 page, pageSize，經過 PaginationMiddleware 處理後
 * 會轉為 take 和 skip，這兩個參數可以直接餵給 typeORM
 *
 * Example:
 *
 * this._repoistory.findAll({ take, skip })
 */
export class PaginationDto {
  take: number
  skip: number
}

/**
 * 帶有分頁資料的回傳JSON格式
 *
 * {
 *   data: [],
 *   page: 1,
 *   pageSize: 10,
 *   total: 0
 * }
 */
export class PaginationResponseDto<T = any> {
  @ApiProperty({
    description: '資料列',
    isArray: true,
    example: [{ name: 'chonny' }, { name: 'mary' }],
  })
  data: T[]

  @ApiProperty({
    description: '當前頁數 (從 1 開始，沒給預設是 1)',
    example: 1,
    required: false,
  })
  page: number

  @ApiProperty({
    description: '每頁筆數 (沒給預設 10)',
    example: 10,
    required: false,
  })
  pageSize: number

  @ApiProperty({ description: '總筆數', example: 1000, type: Number })
  total: number
}
