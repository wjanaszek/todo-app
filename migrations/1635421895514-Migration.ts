import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1635421895514 implements MigrationInterface {
    name = 'Migration1635421895514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c56120106977cc14f975726af07"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "authorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todoAuthor" ADD CONSTRAINT "UQ_7dc929a5822dbda2ab09dd94f22" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c56120106977cc14f975726af07" FOREIGN KEY ("authorId") REFERENCES "todoAuthor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c56120106977cc14f975726af07"`);
        await queryRunner.query(`ALTER TABLE "todoAuthor" DROP CONSTRAINT "UQ_7dc929a5822dbda2ab09dd94f22"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "authorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c56120106977cc14f975726af07" FOREIGN KEY ("authorId") REFERENCES "todoAuthor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
