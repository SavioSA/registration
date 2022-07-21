import { MigrationInterface, QueryRunner } from "typeorm";

export class user1658446090902 implements MigrationInterface {
    name = 'user1658446090902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, birthday DATE NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`);
    }

}
