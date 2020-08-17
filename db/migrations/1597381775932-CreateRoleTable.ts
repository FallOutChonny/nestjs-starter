import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRoleTable1597381775932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "roles" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
        "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT "PK_userId" PRIMARY KEY ("id")
       )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "roles"`)
  }
}
