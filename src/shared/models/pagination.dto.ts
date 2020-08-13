import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  take: number
  skip: number
}

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
