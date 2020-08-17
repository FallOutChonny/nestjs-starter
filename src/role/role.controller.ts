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
import RoleService from './role.service'
import { RoleDto, SearchRoleDto } from './role.dto'

@ApiTags('角色管理')
@Controller('roles')
export default class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: '取得角色列表' })
  @ApiQueryPagination()
  async findAll(@Query() params: SearchRoleDto): Promise<PaginationResponseDto<RoleDto>> {
    const [users, total] = await this.roleService.searchRoles(params)

    return {
      data: users.map((x) => this.roleService.prepareRoleModel(x)),
      page: +params.skip + 1,
      pageSize: +params.take,
      total,
    }
  }

  @Post()
  @ApiOperation({ summary: '新增角色' })
  @ApiCreatedResponse({ type: RoleDto })
  @ApiErrorResponse()
  async create(@Body() role: RoleDto): Promise<RoleDto> {
    const newRole = await this.roleService.createRole(role)
    const roleModel = this.roleService.prepareRoleModel(newRole)

    return roleModel
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiOkResponse({ type: RoleDto })
  @ApiErrorResponse()
  async update(@Param() id: number, @Body() user: RoleDto): Promise<RoleDto> {
    const newRole = await this.roleService.updateRole(user)
    const roleModel = this.roleService.prepareRoleModel(newRole)

    return roleModel
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiOperation({ summary: '刪除角色' })
  @ApiErrorResponse()
  async delete(@Param('id') id: number) {
    return this.roleService.deleteRole(id)
  }
}
