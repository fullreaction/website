import { Knex } from 'knex';

// !!!! Add triggers for relationships !!!!

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('directories', (table) => {
      table.increments('dir_id').primary().unique().notNullable();
      table.string('dir_name').notNullable();
      table.integer('parent_id').unsigned();
      table.binary('user_id', 16); //Only for root dir

      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('parent_id').references('dir_id').inTable('directories');
    })
    .createTable('files', (table) => {
      table.increments('file_id').primary().unique().notNullable();
      table.string('file_name').notNullable();
      table.integer('parent_id').unsigned().notNullable();

      table.foreign('parent_id').references('dir_id').inTable('directories');
    })
    .raw('ALTER TABLE files ADD COLUMN file_data BLOB NULL AFTER file_name') //knex doesn't have blob filetype
    .createTable('relationships', (table) => {
      table.increments('rel_id').primary().unique().notNullable();
      table.integer('parent_id').unsigned().notNullable();
      table.integer('child_id').unsigned().notNullable();
      table.integer('depth').unsigned().notNullable();

      table.foreign('parent_id').references('dir_id').inTable('directories');
      table.foreign('child_id').references('dir_id').inTable('directories');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files').dropTable('relationships').dropTable('directories');
}
