import { Controller, Query, Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import ErrorDto from '@/models/error.dto'
import { PaginationResponseDto } from '@/models/pagination.dto'
import UserService from './user.service'
import { UserDto, SearchUserDto } from './user.dto'

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
  async findAll(@Query() params: SearchUserDto): Promise<PaginationResponseDto<UserDto>> {
    const [users, total] = await this.userService.searchUsers(params)

    return {
      data: users.map((x) => this.userService.prepareUserModel(x)),
      page: +params.skip + 1,
      pageSize: +params.take,
      total,
    }
  }

  @Post()
  @ApiOperation({ summary: '新增使用者' })
  @ApiCreatedResponse({ type: UserDto })
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
  @ApiParam({ name: 'id', description: '使用者ID' })
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: '沒有權限', type: ErrorDto })
  @ApiBadRequestResponse({ description: '前端參數錯誤', type: ErrorDto })
  @ApiInternalServerErrorResponse({ description: '伺服器錯誤', type: ErrorDto })
  async update(@Param() id: number, @Body() user: UserDto): Promise<UserDto> {
    const newUser = await this.userService.updateUser(user)
    const userModel = this.userService.prepareUserModel(newUser)

    return userModel
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '使用者ID' })
  @ApiOperation({ summary: '刪除使用者' })
  @ApiUnauthorizedResponse({ description: '沒有權限', type: ErrorDto })
  @ApiInternalServerErrorResponse({ description: '伺服器錯誤', type: ErrorDto })
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id)
  }

  @Get(':id')
  @ApiOperation({ summary: '取得使用者資料' })
  @ApiUnauthorizedResponse({ description: '沒有權限', type: ErrorDto })
  @ApiInternalServerErrorResponse({ description: '伺服器錯誤', type: ErrorDto })
  async userDetail(@Query('id') id: number): Promise<UserDto> {
    const user = await this.userService.findUserById(id)

    return this.userService.prepareUserModel(user)
  }
}
