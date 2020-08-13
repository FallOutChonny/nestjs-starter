import { Column, Entity, Index, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'
import BaseEntity from '@/models/base.entity'
import { Gender } from '@/constants/types'

@Index('PK_cace4a159ff9f2512dd42373760', ['id'], { unique: true })
@Index('UQ_78a916df40e02a9deb1c4b75edb', ['email'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users extends BaseEntity {
  @Column('character varying', { name: 'username', nullable: true })
  public username: string | null

  @Column('character varying', { name: 'firstName', nullable: true })
  public firstName: string | null

  @Column('character varying', { name: 'lastName', nullable: true })
  public lastName: string | null

  @Column('character varying', { name: 'password' })
  public password: string

  @Column('character varying', { name: 'email', unique: true })
  public email: string

  @Column('timestamp without time zone', {
    name: 'lastLoginTime',
    nullable: true,
  })
  public lastLoginTime: Date | null

  @Column('date', { name: 'birthDate', nullable: true })
  public birthDate: Date | null

  @Column('enum', {
    name: 'gender',
    nullable: true,
    enum: Object.keys(Gender),
  })
  public gender: Gender | null

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
