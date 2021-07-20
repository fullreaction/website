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
      `CREATE PROCEDURE count_name_duplicates (IN newName NVARCHAR(255), OUT count_ INT)
  BEGIN
    SELECT SUM(ind_count) INTO count_ from
    (
      SELECT COUNT(DISTINCT d.dir_name) AS ind_count FROM directories d
      WHERE d.dir_name = newName OR d.dir_name LIKE CONCAT(newName,' (%)')
      UNION ALL
      SELECT COUNT(DISTINCT f.file_name) FROM files f
      WHERE f.file_name = newName OR f.file_name LIKE CONCAT(newName,' (%)')
    ) AS tmp_table;
  END`,
    )
    .then(console.log);
  knex
    .raw(
      `CREATE TRIGGER dir_name_duplication BEFORE INSERT ON directories
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
        CALL count_name_duplicates(NEW.dir_name, count_);
        IF count_ > 0 THEN
          SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
  knex
    .raw(
      `CREATE TRIGGER dir_upd_name_duplication BEFORE UPDATE ON directories
    FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
        CALL count_name_duplicates(NEW.dir_name, count_);
        IF count_ > 0 THEN
          SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
  knex
    .raw(
      `CREATE TRIGGER file_name_duplication BEFORE INSERT ON files
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         CALL count_name_duplicates(NEW.file_name, count_);
        IF count_ > 0 THEN
          SET NEW.file_name=CONCAT(NEW.file_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
  knex
    .raw(
      `CREATE TRIGGER file_upd_name_duplication BEFORE UPDATE ON files
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         CALL count_name_duplicates(NEW.file_name, count_);
        IF count_ > 0 THEN
          SET NEW.file_name=CONCAT(NEW.file_name,' (',count_,')');
        END IF;
      END`,
    )
    .then(console.log);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER IF EXISTS add_relationships_dir').catch(console.log);

  knex.raw('DROP TRIGGER IF EXISTS dir_name_duplication').catch(console.log);
  knex.raw('DROP TRIGGER IF EXISTS dir_upd_name_duplication').catch(console.log);

  knex.raw('DROP TRIGGER IF EXISTS file_name_duplication').catch(console.log);
  knex.raw('DROP TRIGGER IF EXISTS file_upd_name_duplication').catch(console.log);

  knex.raw('DROP PROCEDURE IF EXISTS count_name_duplications').catch(console.log);
}
