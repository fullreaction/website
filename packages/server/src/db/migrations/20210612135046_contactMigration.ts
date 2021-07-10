import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('contact_id').primary().unique().notNullable();
    table.string('contact_email').notNullable();
    table.string('contact_message').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contacts');
}
