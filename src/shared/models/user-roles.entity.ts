import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import Roles from '@role/role.entity'
import Users from '@user/user.entity'

@Index('user_roles_pkey', ['roleId', 'userId'], { unique: true })
@Entity('user_roles', { schema: 'public' })
export default class UserRoles {
  @Column('integer', { primary: true, name: 'userId' })
  userId: number

  @Column('integer', { primary: true, name: 'roleId' })
  roleId: number

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column('timestamp without time zone', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @ManyToOne(() => Roles, (roles) => roles.userRoles, { onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  role: Roles

  @ManyToOne(() => Users, (users) => users.userRoles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: Users
}
