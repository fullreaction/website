import { Injectable } from '@nestjs/common';
import { toBinaryUUID } from 'binary-uuid';

import { Directory } from 'src/file-system/file-system.models';

import { DatabaseService } from '../dbService';

// File system Data Access Object

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}

  // Done
  async initUser(email: string) {
    const owner = this.db.database('users').select('user_id').where({ user_email: email });
    await this.db.database('directories').insert({
      dir_name: email,
      parent_id: null,
      owner: owner,
    });
    const res = await this.db.database('directories').select('dir_id').where({ dir_name: email });
    console.log(res[0].dir_id);
  }

  async addFile(file: File, directory: Directory) {
    this.db.database('files').insert({
      file_name: file.name,
      owner: directory.owner.user_id,
      parent_id: directory.id,
    });
  }
  // Done
  async addDirectory(directory: Directory, parent: Directory) {
    let parent_Id;
    if (parent == null) {
      const res = await this.db
        .database('directories')
        .select('dir_id')
        .where({ owner: toBinaryUUID(directory.owner.user_id as string), parent_id: null });
      parent_Id = res[0].dir_id;
    } else parent_Id = parent.id;

    await this.db.database('directories').insert({
      dir_name: directory.name,
      owner: toBinaryUUID(directory.owner.user_id as string),
      parent_id: parent_Id,
    });
  }

  async removeDirectory(directory: Directory) {
    if (directory.id != null) {
      await this.db.database('directories').delete('*').where({ dir_id: directory.id });
    }
  }

  // Dir-side done
  async getChildren(directory: Directory) {
    let directories, files;
    if (directory.parent_id == null) {
      const rootDir = await this.db
        .database('directories')
        .select('dir_id')
        .where({ parent_id: null, owner: toBinaryUUID(directory.owner.user_id as string) });
      directories = await this.db.database<File>('directories').where('parent_id', '=', rootDir[0].dir_id);
      files = await this.db.database<File>('files').where('parent_id', '=', rootDir[0].dir_id);
    } else {
      directories = await this.db.database<File>('directories').where('parent_id', '=', directory.id);
      console.log(directories);

      files = await this.db.database<File>('files').where('parent_id', '=', directory.id);
    }
    return { files: files, directories: directories };
  }
}
