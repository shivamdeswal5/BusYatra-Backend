import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751274692257 implements MigrationInterface {
    name = 'Migration1751274692257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" ADD "currentLocation" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "currentLocation"`);
    }

}
