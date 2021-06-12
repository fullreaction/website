import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('password_reset_tokens', (table) => {
    table.increments('prt_id').primary().unique().notNullable();
    table.string('email').notNullable();
    table.string('token').notNullable();
    table.timestamps(true, true);
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable('password_reset_tokens');
};
