import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import initClass from '@/utils/init-class'
import BaseDto from '@/models/base.dto'
import { PaginationDto } from '@/models/pagination.dto'
import Role from './role.entity'

export class RoleDto extends BaseDto {
  @ApiProperty({
    description: '角色名稱',
    required: true,
  })
  @IsNotEmpty()
  public name: string

  constructor(props: Partial<Role>) {
    super()
    initClass(this, props)
  }
}

export class SearchRoleDto extends PaginationDto {
  keyword?: string
}

export default RoleDto
