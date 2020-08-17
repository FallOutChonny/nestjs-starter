import { MigrationInterface, QueryRunner } from 'typeorm'
import UserEntity from '../../src/user/user.entity'

export class SeedUserData1596726912588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(UserEntity)

    const users: UserEntity[] = []

    await Promise.all(users.map((u) => userRepo.save(u)))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE * FROM users')
  }
}
