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
      `CREATE PROCEDURE count_name_duplicates (IN newName NVARCHAR(255), IN newParentId INT, OUT count_ INT)
    BEGIN
      SET count_=0;
      IF EXISTS (SELECT dir_name, parent_id FROM directories WHERE dir_name=newName AND parent_id=newParentId )
      OR EXISTS (SELECT file_name, parent_id FROM files WHERE file_name=newName AND parent_id=newParentId)
      THEN
        SELECT SUM(ind_count) INTO count_ from
        (
          SELECT COUNT(DISTINCT d.dir_name, d.parent_id) AS ind_count FROM directories d
          WHERE (d.dir_name = newName OR d.dir_name LIKE CONCAT(newName,' (%)')) AND d.parent_id = newParentId
          UNION ALL
          SELECT COUNT(DISTINCT f.file_name, f.parent_id) FROM files f
          WHERE (f.file_name = newName OR f.file_name LIKE CONCAT(newName,' (%)')) AND f.parent_id=newParentId
        ) AS tmp_table;
      END IF;
    END`,
    )
    .catch(console.log);
  knex
    .raw(
      `CREATE TRIGGER dir_name_duplication BEFORE INSERT ON directories
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
        CALL count_name_duplicates(NEW.dir_name, NEW.parent_id, count_);
        IF count_ > 0 THEN
          SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
        END IF;
      END`,
    )
    .catch(console.log);
  knex
    .raw(
      `CREATE TRIGGER dir_upd_name_duplication BEFORE UPDATE ON directories
    FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
        CALL count_name_duplicates(NEW.dir_name, NEW.parent_id, count_);
        IF count_ > 0 THEN
          SET NEW.dir_name=CONCAT(NEW.dir_name,' (',count_,')');
        END IF;
      END`,
    )
    .catch(console.log);
  knex
    .raw(
      `CREATE TRIGGER file_name_duplication BEFORE INSERT ON files
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         CALL count_name_duplicates(NEW.file_name, NEW.parent_id, count_);
        IF count_ > 0 THEN
          SET NEW.file_name=CONCAT(NEW.file_name,' (',count_,')');
        END IF;
      END`,
    )
    .catch(console.log);
  knex
    .raw(
      `CREATE TRIGGER file_upd_name_duplication BEFORE UPDATE ON files
      FOR EACH ROW
      BEGIN
        DECLARE count_ INT DEFAULT 0;
         CALL count_name_duplicates(NEW.file_name, NEW.parent_id, count_);
        IF count_ > 0 THEN
          SET NEW.file_name=CONCAT(NEW.file_name,' (',count_,')');
        END IF;
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
          END IF;
      END`,
    )
    .catch(console.log);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP TRIGGER IF EXISTS add_relationships_dir').catch(console.log);

  knex.raw('DROP TRIGGER IF EXISTS dir_name_duplication').catch(console.log);
  knex.raw('DROP TRIGGER IF EXISTS dir_upd_name_duplication').catch(console.log);

  knex.raw('DROP TRIGGER IF EXISTS file_name_duplication').catch(console.log);
  knex.raw('DROP TRIGGER IF EXISTS file_upd_name_duplication').catch(console.log);

  knex.raw('DROP PROCEDURE IF EXISTS count_name_duplicates').catch(console.log);
  knex.raw('DROP TRIGGER IF EXISTS generate_mimetype_ins');
}
