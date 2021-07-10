import { Injectable } from '@nestjs/common';

import { Directory } from 'src/file-system/file-system.models';

import { DatabaseService } from '../dbService';

// File system Data Access Object

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}

  async initUser(email: string) {
    await this.db.database('directories').insert({
      dir_name: email,
      parent_id: null,
      user_id: this.db.database('users').select('user_id').where({ user_email: email }),
    });
    const root = await this.db.database('directories').select('dir_id').where({ dir_name: email });
    await this.db.database('relationships').insert({
      parent_id: root,
      child_id: root,
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
    this.db
      .database('directories')
      .insert({
        dir_name: directory.name,
        owner: directory.owner.user_id,
        parent_id: parent.id,
      })
      .then((res) => {
        dirId = res[0];
      });
    this.fixRelationships(parent.id, dirId);
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
    this.db.database
      .from(this.db.database.raw('?? (??,??,??)', ['relationships', 'parent_id', 'child_id', 'depth']))
      .insert(() => {
        this.db
          .database()
          .from('relationships p, c')
          .where('p.child_id', '=', parentId)
          .andWhere('c.parent_id', '=', childId)
          .select('p.parent, c.child, p.depth+c.depth+1');
      });
  }
}
