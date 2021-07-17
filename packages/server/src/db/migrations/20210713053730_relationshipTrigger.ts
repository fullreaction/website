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

  // Join with files,
  // for both dir and file tables
  knex
    .raw(
      `CREATE TRIGGER fixNameDuplication BEFORE INSERT ON directories
    FOR EACH ROW
    BEGIN
      SELECT COUNT(DISTINCT dir_name) INTO count_ FROM directories WHERE dir_name = NEW.dir_name OR dir_name LIKE CONCAT(NEW.dir_name,' (%)');
      IF count_>0 THEN
        SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
      END IF;
    END`,
    )
    .then(console.log);
  knex.raw('DELIMITER ;');
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER add_relationships_dir').catch(console.log);
  knex.raw('DROP TRIGGER fixNameDuplication').catch(console.log);
}
