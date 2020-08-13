import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '使用者密碼' })
  @IsNotEmpty({ message: '密碼為必填' })
  public readonly password: string
}

export class LoginResponseDto {
  @ApiProperty({ description: 'authorization token' })
  public readonly token: string
}

export class RegisterUserDto {}
