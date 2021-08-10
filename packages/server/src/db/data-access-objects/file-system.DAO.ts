import { HttpException, Injectable } from '@nestjs/common';
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
  async addFile(file: Express.Multer.File, dir_id: number, owner: string) {
    this.db
      .database('files')
      .insert({
        file_name: file.originalname,
        owner: toBinaryUUID(owner as string),
        parent_id: dir_id,
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

  async changeFileName(file_id: number, name: string) {
    this.db.database<FileEntry>('files').update({ file_name: name }).where({ file_id: file_id });
  }

  async removeFile(file_id: number) {
    const fPath = await this.db.database<FileEntry>('files').where({ file_id: file_id }).select('file_path');
    this.db.database<FileEntry>('fies').where({ file_id: file_id }).delete('*');
    unlink(fPath[0].file_path, (err) => {
      if (err) console.log(err);
    });
  }

  async addDirectory(dir_name: string, owner: string, parent_id: number) {
    if (parent_id == null) {
      const res = await this.db
        .database('directories')
        .select('dir_id')
        .where({ owner: toBinaryUUID(owner), parent_id: null });
      parent_id = res[0].dir_id;
    }
    await this.db
      .database('directories')
      .insert({
        dir_name: dir_name,
        owner: toBinaryUUID(owner),
        parent_id: parent_id,
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  async changeDirectoryName(dir_id: number, name: string) {
    await this.db
      .database<Directory>('directories')
      .update({ dir_name: name })
      .where({ dir_id: dir_id })
      .catch(console.log);
  }

  async removeDirectory(dir_id: number) {
    if (dir_id != null) {
      return await this.db.database('directories').delete('*').where({ dir_id: dir_id });
    } else
      throw new HttpException(
        {
          code: 'BadArgument',
          message: 'Directory ID is null',
          target: 'directories',
        },
        500,
      );
  }

  async getChildren(dir_id: number, owner: string) {
    let directories: Directory[], files: FileEntry[];

    if (dir_id == null) {
      const rootDir = await this.db
        .database('directories')
        .select('dir_id')
        .where({ parent_id: null, owner: toBinaryUUID(owner as string) });
      directories = await this.db.database<Directory>('directories').where('parent_id', '=', rootDir[0].dir_id);
      files = await this.db.database<FileEntry>('files').where('parent_id', '=', rootDir[0].dir_id);
    } else {
      directories = await this.db.database<Directory>('directories').where('parent_id', '=', dir_id);

      files = await this.db
        .database<FileEntry>('files')
        .where('parent_id', '=', dir_id)
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
  async getPath(dir_id: number) {
    const res = await this.db
      .database('directories')
      .join('relationships', 'directories.dir_id', 'relationships.parent_id')
      .select('directories.dir_name', 'directories.dir_id')
      .where('relationships.child_id', '=', dir_id)
      .whereNotNull('directories.parent_id')
      .orderBy('relationships.depth', 'desc');

    return res;
  }
  async getSkeleton(dir_id: number, owner: string) {
    const ret: { root: { dir_name: string; dir_id: number }; children: { dir_name: string; dir_id: number }[] } = {
      root: null,
      children: [],
    };
    if (dir_id == null) {
      ret.root = await this.db
        .database('directories')
        .select('dir_name', 'dir_id')
        .where({ parent_id: null, owner: toBinaryUUID(owner as string) })
        .first();

      ret.children = await this.db
        .database<Directory>('directories')
        .select('dir_name', 'dir_id')
        .where({ parent_id: ret.root.dir_id });
    } else {
      ret.children = await this.db
        .database<Directory>('directories')
        .select('dir_name', 'dir_id')
        .where({ parent_id: dir_id });
      ret.root = await this.db
        .database<Directory>('directories')
        .select('dir_name', 'dir_id')
        .where({ dir_id: dir_id })
        .first();
    }

    return ret;
  }
}
