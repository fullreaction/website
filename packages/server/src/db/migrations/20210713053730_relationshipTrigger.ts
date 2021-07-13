import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.raw('DELIMITER //');
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
    .then(console.log);

  knex.raw('DELIMITER ;');
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER add_relationships_dir').catch(console.log);
}
