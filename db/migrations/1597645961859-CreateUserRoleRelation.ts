import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserRoleRelation1597645961859 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_roles" (
        "userId" int REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
        "roleId" int REFERENCES "roles" ("id") ON UPDATE CASCADE,
        "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
        "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT user_roles_pkey PRIMARY KEY ("userId", "roleId")  -- explicit pk
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_roles`)
  }
}
