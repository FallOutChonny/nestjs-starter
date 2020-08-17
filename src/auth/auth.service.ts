import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import UserService from '@user/user.service'
import UserDto from '@user/user.dto'
import JwtPayload from './jwt-payload'
import { LoginUserDto, LoginResponseDto } from './auth.dto'
import config from '../app.config'

@Injectable()
export default class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  public async login(loginUser: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this._userService.findUser({ email: loginUser })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }

    // compare passwords
    const areEqual = await bcrypt.compare(user.password, loginUser.password)

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const userModel = this._userService.prepareUserModel(user)
    const { accessToken, expiresIn } = this.createToken({ email: loginUser.email })

    return {
      ...userModel,
      expiresIn,
      accessToken,
    }
  }

  public async register(userDto: UserDto) {
    const user = await this._userService.createUser(userDto)

    const userModel = this._userService.prepareUserModel(user)
    const { accessToken, expiresIn } = this.createToken({ email: userDto.email })

    return {
      ...userModel,
      expiresIn,
      accessToken,
    }
  }

  public async validateUser(payload: JwtPayload) {
    const user = await this._userService.findUser({ email: payload.email })

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    return user
  }

  public async getLoginUser(token: string) {
    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    const { email } = this._jwtService.decode(token) as JwtPayload

    return await this._userService.findUser({ email })
  }

  private createToken(payload: { [key: string]: any }) {
    const accessToken = this._jwtService.sign(payload)
    const expiresIn = config.get('EXPIRESIN')

    return {
      accessToken,
      expiresIn,
    }
  }
}
