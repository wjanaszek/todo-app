import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1634299645519 implements MigrationInterface {
    name = 'Migration1634299645519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authUser" DROP CONSTRAINT "UQ_f138d14b673dd347017e61bb236"`);
        await queryRunner.query(`ALTER TABLE "authUser" ADD CONSTRAINT "UQ_9c28e8877e4ac7c61a1576b4a01" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "authUser" ADD CONSTRAINT "UQ_11c27e3079c5291a71fb3be638c" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "authUser" ADD CONSTRAINT "UQ_EMAIL_USERNAME" UNIQUE ("email", "username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authUser" DROP CONSTRAINT "UQ_EMAIL_USERNAME"`);
        await queryRunner.query(`ALTER TABLE "authUser" DROP CONSTRAINT "UQ_11c27e3079c5291a71fb3be638c"`);
        await queryRunner.query(`ALTER TABLE "authUser" DROP CONSTRAINT "UQ_9c28e8877e4ac7c61a1576b4a01"`);
        await queryRunner.query(`ALTER TABLE "authUser" ADD CONSTRAINT "UQ_f138d14b673dd347017e61bb236" UNIQUE ("email", "username")`);
    }

}
