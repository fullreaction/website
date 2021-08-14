import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('directories', (table) => {
      table.increments('dir_id').primary().unique().notNullable();
      table.string('dir_name').notNullable();
      table.integer('parent_id').unsigned();
      table.binary('owner', 16);

      table.foreign('parent_id').references('dir_id').inTable('directories').onDelete('CASCADE');
    })
    .raw('ALTER TABLE directories MODIFY owner binary(16)') //binary instead of varbinary
    .raw('ALTER TABLE directories ADD FOREIGN KEY (owner) REFERENCES users(user_id) ON DELETE CASCADE')
    .createTable('files', (table) => {
      table.increments('file_id').primary().unique().notNullable();
      table.string('file_name').notNullable();
      table.string('file_path').notNullable();
      table.string('file_type');
      table.integer('parent_id').unsigned().notNullable();
      table.binary('owner', 16);

      table.foreign('parent_id').references('dir_id').inTable('directories').onDelete('CASCADE');
    })
    .raw('ALTER TABLE files MODIFY owner binary(16)') //binary instead of varbinary
    .raw('ALTER TABLE files ADD FOREIGN KEY (owner) REFERENCES users(user_id) ON DELETE CASCADE')
    .createTable('relationships', (table) => {
      table.increments('rel_id').primary().unique().notNullable();
      table.integer('parent_id').unsigned().notNullable();
      table.integer('child_id').unsigned().notNullable();
      table.integer('depth').unsigned().notNullable();

      table.foreign('parent_id').references('dir_id').inTable('directories').onDelete('CASCADE');
      table.foreign('child_id').references('dir_id').inTable('directories').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files').dropTable('relationships').dropTable('directories');
}
