import { Knex } from 'knex';

/*
  When there are 2 folders of the same name and parent_id
  merge
*/

export async function up(knex: Knex): Promise<void> {
  //Done
  knex
    .raw(
      `CREATE TRIGGER add_relationships_dir AFTER INSERT ON directories
  FOR EACH ROW
  BEGIN
      INSERT INTO relationships(parent_id, child_id, depth)
       VALUES (NEW.dir_id, NEW.dir_id, 0);

      INSERT INTO relationships(parent_id, child_id, depth)
      SELECT p.parent_id, c.child_id, p.depth+c.depth+1
      FROM relationships p, relationships c
      WHERE p.child_id=NEW.parent_id and c.parent_id=NEW.dir_id;
	END`,
    )
    .catch(console.log);

  knex
    .raw(
      `CREATE TRIGGER generate_mimetype_ins BEFORE INSERT ON files
      FOR EACH ROW
      BEGIN
        IF REVERSE(SUBSTRING_INDEX(REVERSE(NEW.file_name), '.', 1)) <> NEW.file_name THEN
            SET NEW.file_type = REVERSE(SUBSTRING_INDEX(REVERSE(NEW.file_name), '.', 1));
            SET NEW.file_name = SUBSTRING_INDEX(NEW.file_name, '.', LENGTH(NEW.file_name)-LENGTH(replace(NEW.file_name,'.','')));
          END IF;
      END`,
    )
    .catch(console.log);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER IF EXISTS add_relationships_dir').catch(console.log);

  knex.raw('DROP TRIGGER IF EXISTS generate_mimetype_ins');
}
