import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema
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
    .createTable('sessions', (table) => {
      table.increments('session_pk');
      table.string('session_id', 50).notNullable().unique();
      table.timestamps(true, true);
    });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable('users').dropTable('sessions');
};
