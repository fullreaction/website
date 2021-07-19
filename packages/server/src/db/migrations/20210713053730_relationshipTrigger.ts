import { Knex } from 'knex';

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
    .then(console.log);

  // Turn into procedure and then add to
  // both tables before insert & update
  knex
    .raw(
      `CREATE TRIGGER fix_name_dup_dir BEFORE INSERT ON directories
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         SELECT SUM(ind_count) INTO count_ from
         (
        SELECT COUNT(DISTINCT d.dir_name) AS ind_count FROM directories d
        WHERE d.dir_name = NEW.dir_name OR d.dir_name LIKE CONCAT(NEW.dir_name,' (%)')
        UNION ALL
        SELECT COUNT(DISTINCT f.file_name) FROM files f
        WHERE f.file_name = NEW.dir_name OR f.file_name LIKE CONCAT(NEW.dir_name,' (%)')
        ) AS tmp_table;
        IF count_ > 0 THEN
          SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
  knex
    .raw(
      `CREATE TRIGGER fix_name_dup_file BEFORE INSERT ON files
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         SELECT SUM(ind_count) INTO count_ from
         (
        SELECT COUNT(DISTINCT d.dir_name) AS ind_count FROM directories d
        WHERE d.dir_name = NEW.file_name OR d.dir_name LIKE CONCAT(NEW.file_name,' (%)')
        UNION ALL
        SELECT COUNT(DISTINCT f.file_name) FROM files f
        WHERE f.file_name = NEW.file_name OR f.file_name LIKE CONCAT(NEW.file_name,' (%)')
        ) AS tmp_table;
        IF count_ > 0 THEN
          SET NEW.file_name=CONCAT(NEW.file_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER add_relationships_dir').catch(console.log);
  knex.raw('DROP TRIGGER fix_name_dup_dir').catch(console.log);
  knex.raw('DROP TRIGGER fix_name_dup_file').catch(console.log);
}
