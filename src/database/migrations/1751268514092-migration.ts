import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751268514092 implements MigrationInterface {
    name = 'Migration1751268514092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stopName" character varying NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stopId" uuid, CONSTRAINT "PK_ed1be877403ad3c921b07f62ca5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "source" character varying NOT NULL, "destination" character varying NOT NULL, "departureTime" character varying NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "busId" uuid, CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buses" ALTER COLUMN "isAvailable" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stops" ADD CONSTRAINT "FK_5a8b1f01aaf0d611038292d8ed1" FOREIGN KEY ("stopId") REFERENCES "rides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_12b5f75ab9a91a8e37e8c5eb123" FOREIGN KEY ("busId") REFERENCES "buses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_12b5f75ab9a91a8e37e8c5eb123"`);
        await queryRunner.query(`ALTER TABLE "stops" DROP CONSTRAINT "FK_5a8b1f01aaf0d611038292d8ed1"`);
        await queryRunner.query(`ALTER TABLE "buses" ALTER COLUMN "isAvailable" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "rides"`);
        await queryRunner.query(`DROP TABLE "stops"`);
    }

}
