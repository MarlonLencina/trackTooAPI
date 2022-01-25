import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class resetToken1643061111539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "resetToken",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: "token",
                    type: "varchar"
                },
                {
                    name: "user_id",
                    type: "varchar"
                },
                {
                    name: "expires_date",
                    type: "timestamp"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("resetToken")
    }

}
