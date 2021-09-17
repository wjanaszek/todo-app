import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1631803419057 implements MigrationInterface {
    name = 'Migration1631803419057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "username" character varying(100) NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_87ce6a6f597b3b50a829e59693e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "todo_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "todo" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "status" "todo_status_enum" NOT NULL, CONSTRAINT "PK_91b21906decd8a2975918e0b16c" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TYPE "todo_status_enum"`);
        await queryRunner.query(`DROP TABLE "authUser"`);
    }

}
