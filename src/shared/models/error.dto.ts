import { ApiProperty } from '@nestjs/swagger'

/**
 * 發生 400, 401, 500 等錯誤時回傳的 JSON 格式
 *
 * ```
 * {
 *   statusCode: 400,
 *   message: string[] | string,
 *   error: 'Bad Request' | 'Internal Server Error' ...
 * }
 * ```
 */
export default class ErrorResponseDto {
  @ApiProperty({ description: '錯誤類型代碼', example: 400 })
  public statusCode: number

  @ApiProperty({
    description: '錯誤訊息',
    example: ['密碼為必填', '信箱格式錯誤'],
  })
  public message: string | string[]

  @ApiProperty({ example: new Date().toISOString() })
  public timestamp: string

  @ApiProperty({ example: 'POST' })
  public method: string

  @ApiProperty({ example: '/api/v1/users' })
  public path: string
}
