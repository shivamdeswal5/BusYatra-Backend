import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751266690782 implements MigrationInterface {
    name = 'Migration1751266690782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."buses_bustype_enum" AS ENUM('ac', 'non-ac', 'volvo')`);
        await queryRunner.query(`CREATE TABLE "buses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, "registrationNumber" character varying NOT NULL, "availableSeats" integer NOT NULL DEFAULT '30', "busType" "public"."buses_bustype_enum" NOT NULL DEFAULT 'ac', "isAvailable" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_ddebc0eeba64a019ae072975947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buses" ADD CONSTRAINT "FK_0f653ebc2085fb0c795123c5ec3" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buses" DROP CONSTRAINT "FK_0f653ebc2085fb0c795123c5ec3"`);
        await queryRunner.query(`DROP TABLE "buses"`);
        await queryRunner.query(`DROP TYPE "public"."buses_bustype_enum"`);
    }

}
