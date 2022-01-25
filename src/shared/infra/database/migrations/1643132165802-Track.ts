import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Track1643132165802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tracks",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "uuid",
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',  
                },
                {
                    name: "title",
                    type: "varchar",

                },
                {
                    name: "code_track",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "user_id",
                    type: "uuid",
                },
            ],
            foreignKeys: [
                {
                    name: "FKUserTrack",
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
        await queryRunner.dropTable("tracks")
    }

}
