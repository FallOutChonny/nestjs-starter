import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { RoleDto, SearchRoleDto } from './role.dto'
import Role from './role.entity'

@Injectable()
export default class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>,
  ) {}

  public async createRole(role: Partial<RoleDto>): Promise<Role> {
    const { name } = role

    let exist
    try {
      exist = await this._roleRepository.findOne({ where: { name } })
    } catch (error) {
      console.log(error)
      Logger.error(error)
      throw new InternalServerErrorException('Error while creating role')
    }

    if (exist) {
      throw new BadRequestException(`此角色已被使用`)
    }

    const roleEntity = this._roleRepository.create(role)

    await this._roleRepository.save(roleEntity)

    const newRole = await this._roleRepository.findOne({ where: { name } })

    return newRole
  }

  public async updateRole(role: Partial<RoleDto>): Promise<Role> {
    let exist
    try {
      exist = await this._roleRepository.findOne(role.id)
    } catch (error) {
      Logger.error(error)
      throw new InternalServerErrorException('Error while updating role')
    }

    if (!exist) {
      throw new BadRequestException(`角色不存在`)
    }

    await this._roleRepository.update(role.id, role)

    return await this._roleRepository.findOne(role.id)
  }

  public async deleteRole(roleId: number) {
    return this._roleRepository.delete(roleId)
  }

  public async searchRoles({
    keyword = '',
    ...options
  }: SearchRoleDto): Promise<[Role[], number]> {
    return await this._roleRepository.findAndCount({
      ...options,
      where: { name: Like(`%${keyword}%`) },
    })
  }

  public prepareRoleModel(role: Role) {
    return new RoleDto(role)
  }
}
