import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('password_reset_tokens', (table) => {
    table.increments('prt_id').primary().unique().notNullable();
    table.string('email').notNullable();
    table.string('token').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('password_reset_tokens');
}
