import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common'
import { Request as Req } from 'express'
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import ApiErrorResponse from '@/decorators/error-response.decorator'
import { UserDto } from '@user/user.dto'
import UserService from '@user/user.service'
import { LoginUserDto, LoginResponseDto } from './auth.dto'
import AuthService from './auth.service'

@ApiTags('使用者驗證')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '使用者登入' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiErrorResponse()
  async login(@Body() user: LoginUserDto): Promise<LoginResponseDto> {
    return await this._authService.login(user)
  }

  @Post('register')
  @ApiOperation({ summary: '使用者註冊' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiErrorResponse()
  async register(@Body() user: UserDto): Promise<LoginResponseDto> {
    return await this._authService.register(user)
  }

  @Get('me')
  @ApiOperation({ summary: '取得登入者資料' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiErrorResponse()
  @UseGuards(AuthGuard())
  async me(@Request() req: Req): Promise<UserDto> {
    const user = await this._authService.getLoginUser(req.headers.authorization)

    return this._userService.prepareUserModel(user)
  }
}
