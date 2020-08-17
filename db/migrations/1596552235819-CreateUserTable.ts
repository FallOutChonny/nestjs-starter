import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1596552235819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await queryRunner.query(`DROP TYPE IF EXISTS gender`)
    await queryRunner.query(
      `CREATE TYPE gender AS ENUM ('male', 'female', 'other');`,
    )
    // await queryRunner.query(`SET timezone TO 'Asia/Taipei';`)
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL NOT NULL,
        "username" character varying,
        "firstName" character varying,
        "lastName" character varying,
        "password" character varying NOT NULL,
        "email" character varying NOT NULL,
        "lastLoginTime" timestamp,
        "birthDate" date,
        "gender" gender,
        "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
        "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("email"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`)
    await queryRunner.query(`DROP TYPE IF EXISTS "gender"`)
  }
}
