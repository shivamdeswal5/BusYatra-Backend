import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751268799869 implements MigrationInterface {
    name = 'Migration1751268799869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" ADD "rideDate" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "rideDate"`);
    }

}
