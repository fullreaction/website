import { Injectable } from '@nestjs/common';
import { fromBinaryUUID, toBinaryUUID } from 'binary-uuid';
import { unlink } from 'fs';

import { Directory, FileEntry } from 'src/file-system/file-system.models';

import { DatabaseService } from '../dbService';

// File system Data Access Object

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}

  // Done
  async initUser(email: string) {
    const owner = this.db.database('users').select('user_id').where({ user_email: email });
    await this.db
      .database('directories')
      .insert({
        dir_name: email,
        parent_id: null,
        owner: owner,
      })
      .catch(console.log);
  }

  //Done
  async addFile(file: Express.Multer.File, directory: Directory) {
    this.db
      .database('files')
      .insert({
        file_name: file.originalname,
        owner: toBinaryUUID(directory.owner as string),
        parent_id: directory.dir_id,
        file_path: file.destination + '/' + file.filename,
      })
      .then((id) => {
        console.log(id[0] + file.filename);
        file.filename = id[0] + file.filename;
      });
  }
  async getFile(file_id: number) {
    const fPath = await this.db.database<FileEntry>('files').where({ file_id: file_id }).select('file_path');
    return fPath[0].file_path;
  }

  async changeFileName(file: FileEntry, name: string) {
    this.db.database<FileEntry>('files').update({ file_name: name }).where({ file_id: file.file_id });
  }

  async removeFile(file_id: number) {
    const fPath = await this.db.database<FileEntry>('files').where({ file_id: file_id }).select('file_path');
    this.db.database<FileEntry>('fies').where({ file_id: file_id }).delete('*');
    unlink(fPath[0].file_path, (err) => {
      if (err) console.log(err);
    });
  }

  async addDirectory(directory: Directory, parent: Directory) {
    let parent_Id;
    if (parent == null) {
      const res = await this.db
        .database('directories')
        .select('dir_id')
        .where({ owner: toBinaryUUID(directory.owner as string), parent_id: null });
      parent_Id = res[0].dir_id;
    } else parent_Id = parent.dir_id;

    await this.db.database('directories').insert({
      dir_name: directory.dir_name,
      owner: toBinaryUUID(directory.owner as string),
      parent_id: parent_Id,
    });
  }

  async changeDirectoryName(directory: Directory, name: string) {
    this.db
      .database<Directory>('directories')
      .update({ dir_name: name })
      .where({ dir_id: directory.dir_id })
      .then(console.log)
      .catch(console.log);
  }

  async removeDirectory(directory: Directory) {
    if (directory.dir_id != null) {
      await this.db.database('directories').delete('*').where({ dir_id: directory.dir_id });
    }
  }

  async getChildren(directory: Directory) {
    let directories: Directory[], files: FileEntry[];

    if (directory.parent_id == null) {
      const rootDir = await this.db
        .database('directories')
        .select('dir_id')
        .where({ parent_id: null, owner: toBinaryUUID(directory.owner as string) });
      directories = await this.db.database<Directory>('directories').where('parent_id', '=', rootDir[0].dir_id);
      files = await this.db.database<FileEntry>('files').where('parent_id', '=', rootDir[0].dir_id);
    } else {
      directories = await this.db.database<Directory>('directories').where('parent_id', '=', directory.dir_id);

      files = await this.db
        .database<FileEntry>('files')
        .where('parent_id', '=', directory.dir_id)
        .select('file_id', 'file_name', 'owner', 'parent_id');
    }
    directories.forEach((item) => {
      item.owner = fromBinaryUUID(item.owner as Buffer);
    });
    files.forEach((item) => {
      item.owner = fromBinaryUUID(item.owner as Buffer);
    });
    return { files, directories };
  }

  async getSkeleton(directory: Directory) {
    let ret: { dir_name: string; dir_id: number }[];

    if (directory.parent_id == null) {
      const rootDir = await this.db
        .database('directories')
        .select('dir_id')
        .where({ parent_id: null, owner: toBinaryUUID(directory.owner as string) });

      ret = await this.db
        .database<Directory>('directories')
        .select('dir_name', 'dir_id', 'parent_id')
        .where({ parent_id: rootDir[0].dir_id });
    } else {
      ret = await this.db
        .database<Directory>('directories')
        .select('dir_name', 'dir_id', 'parent_id')
        .where({ parent_id: directory.dir_id });
    }

    return ret;
  }
}
