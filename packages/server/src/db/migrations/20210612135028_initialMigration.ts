import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      .createTable('users', (table) => {
        table
          .binary('user_id', 16)
          .notNullable()
          .unique()
          .primary()
          .defaultTo(knex.raw("(unhex(replace(uuid(),'-','')))"));

        table.string('user_email', 30).notNullable().unique();
        table.string('user_pass', 50);
        table.timestamps(true, true); //CreatedAt, UpdatedAt
      })
      //So its binary(16) and not varbinary(16)
      .raw("ALTER TABLE users MODIFY user_id binary(16) NOT NULL DEFAULT (unhex(replace(uuid(),'-','')))") //binary instead of varbinary
      .createTable('sessions', (table) => {
        table.increments('session_pk');
        table.string('session_id', 50).notNullable().unique();
        table.timestamps(true, true);
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users').dropTable('sessions');
}
