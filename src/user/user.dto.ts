import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, ValidateIf, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import { isNil } from 'ramda'
import { Gender } from '@/constants/types'
import initClass from '@/utils/init-class'
import BaseDto from '@/models/base.dto'
import { PaginationDto } from '@/models/pagination.dto'
import User from './user.entity'

export class UserDto extends BaseDto {
  @ApiProperty({ description: '使用者信箱', example: 'mama.whowho@gmail.com' })
  @ValidateIf((o) => !isNil(o.email) || isNil(o.id))
  @IsEmail({}, { message: '信箱格式錯誤' })
  @IsNotEmpty({ message: '信箱為必填' })
  public email: string

  @ApiProperty({ description: '登入密碼', example: '12345678' })
  @ValidateIf((o) => isNil(o.id))
  @IsNotEmpty({ message: '密碼為必填' })
  @Exclude()
  public password: string

  @ApiProperty({
    description: '生日',
    type: 'number',
    example: new Date(),
    required: false,
  })
  public birthDate: Date

  @ApiProperty({ description: '名', required: false, example: 'Chonny' })
  public lastName: string

  @ApiProperty({ description: '姓', required: false, example: 'Chu' })
  public firstName: string

  @ApiPropertyOptional({
    description: '暱稱',
    example: 'chonny87',
    required: false,
  })
  public username: string

  @ApiPropertyOptional({
    description: '姓別',
    required: false,
    enum: Object.values(Gender),
  })
  public gender: Gender

  constructor(props: Partial<User>) {
    super()
    initClass(this, props)
  }
}

export class SearchUserDto extends PaginationDto {
  keyword?: string
}

export default UserDto
