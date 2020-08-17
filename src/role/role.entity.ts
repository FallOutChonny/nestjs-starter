import { Column, Entity, Index, OneToMany } from 'typeorm'
import BaseEntity from '@/models/base.entity'
import UserRoles from '@/models/user-roles.entity'

@Index('PK_userId', ['id'], { unique: true })
@Entity('roles', { schema: 'public' })
export default class Roles extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: true })
  name: string | null

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[]
}
