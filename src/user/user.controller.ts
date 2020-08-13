import { Controller, Query, Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { PaginationResponseDto } from '@/models/pagination.dto'
import ApiErrorResponse from '@/decorators/error-response.decorator'
import ApiQueryPagination from '@/decorators/query-pagination.decorator'
import UserService from './user.service'
import { UserDto, SearchUserDto } from './user.dto'

@ApiTags('使用者管理')
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '取得使用者列表' })
  @ApiQueryPagination()
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
  @ApiErrorResponse()
  async create(@Body() user: UserDto): Promise<UserDto> {
    const newUser = await this.userService.createUser(user)
    const userModel = this.userService.prepareUserModel(newUser)

    return userModel
  }

  @Put(':id')
  @ApiOperation({ summary: '更新使用者' })
  @ApiParam({ name: 'id', description: '使用者ID' })
  @ApiOkResponse({ type: UserDto })
  @ApiErrorResponse()
  async update(@Param() id: number, @Body() user: UserDto): Promise<UserDto> {
    const newUser = await this.userService.updateUser(user)
    const userModel = this.userService.prepareUserModel(newUser)

    return userModel
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '使用者ID' })
  @ApiOperation({ summary: '刪除使用者' })
  @ApiErrorResponse()
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id)
  }

  @Get(':id')
  @ApiOperation({ summary: '取得使用者資料' })
  @ApiErrorResponse()
  async userDetail(@Query('id') id: number): Promise<UserDto> {
    const user = await this.userService.findUserById(id)

    return this.userService.prepareUserModel(user)
  }
}
