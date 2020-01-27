import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { cpus } from "os";

export class createUserTable1580146337438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "username",
            type: "varchar(50)"
          },
          {
            name: "password",
            type: "varchar"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
  }
}
