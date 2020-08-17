import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { UserDto } from '@user/user.dto'

export class LoginUserDto {
  @ApiProperty({ description: '使用者信箱' })
  @IsNotEmpty({ message: '信箱為必填' })
  public readonly email: string

  @ApiProperty({ description: '使用者密碼' })
  @IsNotEmpty({ message: '密碼為必填' })
  public readonly password: string
}

export class LoginResponseDto extends UserDto {
  @ApiProperty({ description: 'authorization token' })
  public readonly accessToken: string

  @ApiProperty({ description: 'token 有效時間' })
  public readonly expiresIn: string
}
