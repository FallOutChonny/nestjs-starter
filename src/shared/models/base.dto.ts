import { ApiProperty } from '@nestjs/swagger'

export default class BaseDto {
  @ApiProperty({
    type: Number,
    description: '代碼 (新增時不必帶)',
    example: 1,
  })
  public id: number

  @ApiProperty({
    description: '建立時間 (可以不必帶)',
    type: Date,
    example: new Date(),
    required: false,
  })
  public createdAt: Date

  @ApiProperty({
    description: '更新時間 (可以不必帶)',
    type: Date,
    example: new Date(),
    required: false,
  })
  public updatedAt: Date
}
