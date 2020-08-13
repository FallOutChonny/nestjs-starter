import {
  Controller,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger'
import * as qs from 'qs'
import ErrorDto from '@/models/error.dto'
import UserService from './user.service'
import UserDto from './user.dto'
import User from './user.entity'

@ApiTags('使用者管理')
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '取得使用者列表' })
  @ApiQuery({ name: 'page', description: '當前頁數 (從 1 開始，沒給預設是 1)', example: 1, required: false })
  // prettier-ignore
  @ApiQuery({ name: 'pageSize', description: '每頁筆數 (沒給預設 10)', example: 10, required: false })
  // prettier-ignore
  @ApiQuery({ name: 'keyword', description: '關鍵字', example: 'mama.whowho', required: false, })
  // prettier-ignore
  async findAll(
    @Request() req: Request,
  ): Promise<{ data: UserDto[]; total: number }> {
    const params = qs.parse(req.url)
    const [users, total] = await this.userService.searchUsers(params)

    return {
      data: users.map((x) => this.userService.prepareUserModel(x)),
      total,
    }
  }

  @Post()
  @ApiOperation({ summary: '新增使用者' })
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ description: '沒有權限', type: ErrorDto })
  @ApiBadRequestResponse({ description: '前端參數錯誤', type: ErrorDto })
  @ApiInternalServerErrorResponse({ description: '伺服器錯誤', type: ErrorDto })
  async create(@Body() user: UserDto): Promise<UserDto> {
    const newUser = await this.userService.createUser(user)
    const userModel = this.userService.prepareUserModel(newUser)

    return userModel
  }
  @Put(':id')
  @ApiOperation({ summary: '更新使用者' })
  async update(@Body() user: UserDto): Promise<UserDto> {
    const newUser = await this.userService.updateUser(user)
    const userModel = this.userService.prepareUserModel(newUser)

    return userModel
  }

  @Delete(':id')
  @ApiOperation({ summary: '刪除使用者' })
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id)
  }

  @Get(':id')
  @ApiOperation({ summary: '取得使用者資料' })
  async userDetail(@Query('id') id: number): Promise<UserDto> {
    const user = await this.userService.findUserById(id)

    return this.userService.prepareUserModel(user)
  }
}
