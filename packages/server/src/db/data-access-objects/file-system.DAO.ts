import { Injectable } from '@nestjs/common';
import { toBinaryUUID } from 'binary-uuid';

import { Directory } from 'src/file-system/file-system.models';

import { DatabaseService } from '../dbService';

// File system Data Access Object

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}

  async initUser(email: string) {
    const owner = this.db.database('users').select('user_id').where({ user_email: email });
    await this.db.database('directories').insert({
      dir_name: email,
      parent_id: null,
      owner: owner,
    });
    const res = await this.db.database('directories').select('dir_id').where({ dir_name: email });
    console.log(res[0].dir_id);
    await this.db.database('relationships').insert({
      parent_id: res[0].dir_id,
      child_id: res[0].dir_id,

      depth: 0,
    });
  }

  async addFile(file: File, directory: Directory) {
    let fileId;
    this.db
      .database('files')
      .insert({
        file_name: file.name,
        owner: directory.owner.user_id,
        parent_id: directory.id,
      })
      .then((res) => {
        fileId = res[0];
      });

    this.fixRelationships(directory.id, fileId);
  }
  async addDirectory(directory: Directory, parent: Directory) {
    let dirId;
    const parent_id =
      parent != null
        ? parent.id
        : await this.db
            .database('directories')
            .select('dir_id')
            .where({ owner: toBinaryUUID(directory.owner.user_id as string), parent_id: null });

    await this.db
      .database('directories')
      .insert({
        dir_name: directory.name,
        owner: toBinaryUUID(directory.owner.user_id as string),
        parent_id: parent_id[0].dir_id,
      })
      .then((res) => {
        dirId = res[0];
      });
    await this.db.database('relationships').insert({
      parent_id: dirId,
      child_id: dirId,

      depth: 0,
    });
    this.fixRelationships(parent_id[0].dir_id, dirId);
  }

  async getChildren(dir: Directory) {
    let directories, files;
    if (dir.parent_id == null) {
      const rootDir = this.db
        .database('directories')
        .select('dir_id')
        .where({ parent_id: null, owner: dir.owner.user_id });
      directories = await this.db
        .database<Directory>('directories')
        .join('relationships', 'dir_id', '=', 'relationships.child_id')
        .select('*')
        .where('relationships.parent_id', '=', rootDir);
      files = await this.db
        .database<File>('files')
        .join('relationships', 'file_id', '=', 'relationships.child_id')
        .select('*')
        .where('relationships.parent_id', '=', rootDir);
    } else {
      directories = await this.db
        .database<Directory>('directories')
        .join('relationships', 'dir_id', '=', 'relationships.child_id')
        .select('*')
        .where('relationships.parent_id', '=', dir.id);
      console.log(directories);

      files = await this.db
        .database<File>('files')
        .join('relationships', 'file_id', '=', 'relationships.child_id')
        .select('*')
        .where('relationships.parent_id', '=', dir.id);
      console.log(files);
    }
    return { files: files, directories: directories };
  }

  // Needs to be turned into trigger via migration
  private async fixRelationships(parentId: number, childId: number) {
    this.db
      .database('relationships')
      .insert(
        this.db
          .database({ p: 'relationships', c: 'relationships' })
          .where('p.child_id', '=', parentId)
          .andWhere('c.parent_id', '=', childId)
          .select('p.parent_id', 'c.child_id', 'p.depth + c.depth+1'),
      );
  }
}
