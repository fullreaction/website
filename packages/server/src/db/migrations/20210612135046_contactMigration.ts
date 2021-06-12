import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('contact_id').primary().unique().notNullable();
    table.string('contact_email').notNullable();
    table.string('contact_message').notNullable();
    table.timestamps(true, true);
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable('contacts');
};
