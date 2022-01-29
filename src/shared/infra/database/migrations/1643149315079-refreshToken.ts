import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class refreshToken1643149315079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "refreshToken",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "uuid",
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',  
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "expires_in",
                    type: "timestamp"
                }
            ],
            foreignKeys: [
                {
                    name: "FKUserToken",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("refreshToken")
    }

}
