import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1634568649396 implements MigrationInterface {
    name = 'Migration1634568649396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "username" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_9c28e8877e4ac7c61a1576b4a01" UNIQUE ("email"), CONSTRAINT "UQ_11c27e3079c5291a71fb3be638c" UNIQUE ("username"), CONSTRAINT "PK_87ce6a6f597b3b50a829e59693e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authResetPassword" ("expirationDate" TIMESTAMP NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_2571d313c11a0fb79c46e5ba4d" UNIQUE ("userId"), CONSTRAINT "PK_481c6d6deabf9b2297692e44dab" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE TYPE "todo_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "todo" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "status" "todo_status_enum" NOT NULL, CONSTRAINT "PK_91b21906decd8a2975918e0b16c" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "authResetPassword" ADD CONSTRAINT "FK_2571d313c11a0fb79c46e5ba4dc" FOREIGN KEY ("userId") REFERENCES "authUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authResetPassword" DROP CONSTRAINT "FK_2571d313c11a0fb79c46e5ba4dc"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TYPE "todo_status_enum"`);
        await queryRunner.query(`DROP TABLE "authResetPassword"`);
        await queryRunner.query(`DROP TABLE "authUser"`);
    }

}
