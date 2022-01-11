const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserAndExercise1641882448981 {
    name = 'CreateUserAndExercise1641882448981'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "exercises_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_32fbc90a2be02d19a14f7722c09" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_486d56516b64030a655861e1aa9" FOREIGN KEY ("user_id") REFERENCES "exercises_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_486d56516b64030a655861e1aa9"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "exercises_user"`);
    }
}
