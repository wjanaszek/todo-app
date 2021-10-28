import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1634309496226 implements MigrationInterface {
    name = 'Migration1634309496226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authUser" DROP CONSTRAINT "UQ_EMAIL_USERNAME"`);
        await queryRunner.query(`CREATE TABLE "authResetPassword" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expirationDate" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "REL_2571d313c11a0fb79c46e5ba4d" UNIQUE ("userId"), CONSTRAINT "PK_c1313d7172f4b4b5133122ee0cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authResetPassword" ADD CONSTRAINT "FK_2571d313c11a0fb79c46e5ba4dc" FOREIGN KEY ("userId") REFERENCES "authUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authResetPassword" DROP CONSTRAINT "FK_2571d313c11a0fb79c46e5ba4dc"`);
        await queryRunner.query(`DROP TABLE "authResetPassword"`);
        await queryRunner.query(`ALTER TABLE "authUser" ADD CONSTRAINT "UQ_EMAIL_USERNAME" UNIQUE ("email", "username")`);
    }

}
