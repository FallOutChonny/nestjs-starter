import { ApiProperty } from '@nestjs/swagger'

export default class ErrorResponseDto {
  @ApiProperty()
  public error: string

  @ApiProperty()
  public statusCode: number

  @ApiProperty()
  public message: string
}
