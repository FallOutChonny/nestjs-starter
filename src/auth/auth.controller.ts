import {
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  Query,
  NotImplementedException,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto, LoginResponseDto, RegisterUserDto } from './auth.dto'

@ApiTags('使用者驗證')
@Controller('auth')
export default class AuthController {
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async login(@Body() user: LoginDto) {
    throw new NotImplementedException()
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async register(@Body() user: RegisterUserDto) {
    throw new NotImplementedException()
  }

  @Get('me')
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  async me(@Query() userId: number) {
    throw new NotImplementedException()
  }
}
