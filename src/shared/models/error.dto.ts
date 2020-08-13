import { ApiProperty } from '@nestjs/swagger'

export default class ErrorResponseDto {
  @ApiProperty({ description: '錯誤類型代碼', example: 400 })
  public statusCode: number

  @ApiProperty({
    description: '錯誤訊息',
    example: ['密碼為必填', '信箱格式錯誤'],
  })
  public message: string | string[]

  @ApiProperty({ description: '錯誤類型', example: 'Bad Request' })
  public error: string
}
