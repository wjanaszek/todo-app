import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1631865673988 implements MigrationInterface {
    name = 'Migration1631865673988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authUser" RENAME COLUMN "passwordHash" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authUser" RENAME COLUMN "password" TO "passwordHash"`);
    }

}
