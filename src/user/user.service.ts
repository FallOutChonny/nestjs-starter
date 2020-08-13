import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { UserDto, SearchUserDto } from './user.dto'
import User from './user.entity'

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
    let exist
    try {
      exist = await this._userRepository.findOne(user.id)
    } catch (error) {
      Logger.error(error)
      throw new InternalServerErrorException('Error while updating user')
    }

    if (!exist) {
      throw new BadRequestException(`使用者不存在`)
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

  public async searchUsers({
    keyword = '',
    ...options
  }: SearchUserDto): Promise<[User[], number]> {
    const keywordLike = Like(`%${keyword}%`)

    return await this._userRepository.findAndCount({
      ...options,
      where: [
        { email: keywordLike },
        { username: keywordLike },
        { firstName: keywordLike },
        { lastName: keywordLike },
      ],
    })
  }

  public prepareUserModel(user: User) {
    const userDto = new UserDto(user)

    return userDto
  }
}
