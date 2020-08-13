import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import User from '@user/user.entity'
import UserDto from '@user/user.dto'

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  public async createUser(user: Partial<UserDto>): Promise<User> {
    const { email } = user

    let exist
    try {
      exist = await this._userRepository.findOne({ where: { email } })
    } catch (error) {
      Logger.error(error)
      throw new InternalServerErrorException('Error while creating user')
    }

    if (exist) {
      throw new BadRequestException(`此信箱已被使用`)
    }

    const userEntity = this._userRepository.create(user)

    await this._userRepository.save(userEntity)

    const newUser = await this._userRepository.findOne({ where: { email } })

    return newUser
  }

  public async updateUser(user: Partial<UserDto>): Promise<User> {
    const { id, email } = user

    let exist
    try {
      exist = await this._userRepository.findOne(id)
    } catch (error) {
      Logger.error(error)
      throw new InternalServerErrorException('Error while updating user')
    }

    if (!exist) {
      throw new BadRequestException(`${email} not exists`)
    }

    await this._userRepository.update(user.id, user)

    return await this._userRepository.findOne(user.id)
  }

  public async deleteUser(userId: number) {
    return this._userRepository.delete(userId)
  }

  public async findUserById(userId: number): Promise<User> {
    return this._userRepository.findOne(userId)
  }

  public async searchUsers(
    options: FindManyOptions,
  ): Promise<[User[], number]> {
    return await this._userRepository.findAndCount(options)
  }

  public prepareUserModel(user: User) {
    const userDto = new UserDto(user)

    return userDto
  }
}
