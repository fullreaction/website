import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.raw(
    `CREATE OR REPLACE TRIGGER fix_relationshipsDirs
  AFTER INSERT
  ON directories FOR EACH ROW

  INSERT INTO relationships(parent_id, child_id, depth)
  select p.parent_id, c.child_id, p.depth+c.depth+1
  from relationships p, relationships c
 where p.child_id=new.parent_id and c.parent_id=new.dir_id

`,
  );
}

export async function down(knex: Knex): Promise<void> {
  knex.raw(`DROP TRIGGER fix_relationships`);
}
