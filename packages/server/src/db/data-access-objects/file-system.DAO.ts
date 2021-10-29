import { HttpException, Injectable } from '@nestjs/common';
import { fromBinaryUUID, toBinaryUUID } from 'binary-uuid';
import { unlink } from 'fs';
import { User } from 'src/auth/users/user.model';

import { Directory, FileEntry } from 'src/file-system/file-system.models';

import { DatabaseService } from '../dbService';

// File system Data Access Object

// Catch notfound errors

// Get file_id and parent_id
// Change files parent_id
// knex.js docs

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}

  async initUser(user: User) {
    console.log('runs');
    await this.db
      .database('directories')
      .insert({
        dir_name: user.user_email,
        parent_id: null,
        owner: toBinaryUUID(user.user_id as string),
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          {
            code: 'FieldEmpty',
            message: 'User does not exist',
            target: 'user',
          },
          500,
        );
      });
  }

  async addFile(file: Express.Multer.File, dir_id: number, owner: string) {
    if (dir_id == null) {
      const res = await this.db
        .database('directories')
        .select('dir_id')
        .where({ owner: toBinaryUUID(owner), parent_id: null })
        .catch(() => {
          throw new HttpException(
            {
              code: 'FieldEmpty',
              message: 'Directory does not exist',
              target: 'directories',
            },
            500,
          );
        });
      dir_id = res[0].dir_id;
    }

    await this.db
      .database('files')
      .insert({
        file_name: file.originalname,
        owner: toBinaryUUID(owner as string),
        parent_id: dir_id,
        file_path: file.destination + '/' + file.filename,
      })
      .catch(() => {
        throw new HttpException(
          {
            code: 'InsertError',
            message: 'File could not be saved',
            target: 'files',
          },
          500,
        );
      });
  }
  async getFile(file_id: number) {
    const fPath = await this.db
      .database<FileEntry>('files')
      .where({ file_id: file_id })
      .select('file_path')
      .catch(() => {
        throw new HttpException(
          {
            code: 'FieldEmpty',
            message: 'File does not exist',
            target: 'files',
          },
          500,
        );
      });
    return fPath[0].file_path;
  }

  async changeFileName(file_id: number, name: string) {
    await this.db
      .database<FileEntry>('files')
      .where({ file_id: file_id })
      .update({ file_name: name })
      .catch(() => {
        throw new HttpException(
          {
            code: 'FieldEmpty',
            message: 'File does not exist',
            target: 'files',
          },
          500,
        );
      });
  }

  async removeFile(file_id: number) {
    const fPath = await this.db.database<FileEntry>('files').where({ file_id: file_id }).select('file_path');
    await this.db
      .database<FileEntry>('files')
      .where({ file_id: file_id })
      .delete('*')
      .catch(() => {
        throw new HttpException(
          {
            code: 'FieldEmpty',
            message: 'File does not exist',
            target: 'files',
          },
          500,
        );
      });
    unlink(fPath[0].file_path, (err) => {
      if (err) console.log(err);
    });
  }

  async addDirectory(dir_name: string, owner: string, parent_id: number) {
    if (parent_id == null) {
      const res = await this.db
        .database('directories')
        .select('dir_id')
        .where({ owner: toBinaryUUID(owner), parent_id: null })
        .catch(() => {
          throw new HttpException(
            {
              code: 'FieldEmpty',
              message: 'Parent directory does not exist',
              target: 'directories',
            },
            500,
          );
        });
      parent_id = res[0].dir_id;
    }
    await this.db
      .database('directories')
      .insert({
        dir_name: dir_name,
        owner: toBinaryUUID(owner),
        parent_id: parent_id,
      })
      .catch(() => {
        throw new HttpException(
          {
            code: 'InnerError',
            message: 'Directory was not able to be created',
            target: 'directories',
          },
          500,
        );
      });
  }

  async changeDirectoryName(dir_id: number, name: string) {
    await this.db
      .database<Directory>('directories')
      .update({ dir_name: name })
      .where({ dir_id: dir_id })
      .catch((e) => {
        throw new HttpException(
          {
            code: 'FieldEmpty',
            message: 'Directory does not exist',
            target: 'directories',
          },
          500,
        );
      });
  }

  async removeDirectory(dir_id: number) {
    if (dir_id != null) {
      const filepaths = await this.db
        .database<FileEntry>('directories')
        .join('files', 'files.parent_id', '=', 'directories.dir_id')
        .join('relationships', 'directories.dir_id', '=', 'relationships.child_id')
        .select('files.file_path')
        .where('relationships.parent_id', '=', dir_id)
        .catch((e) => {
          throw new HttpException(
            {
              code: 'FieldEmpty',
              message: 'Directory does not exist',
              target: 'directories',
            },
            500,
          );
        });

      for (const item of filepaths) {
        unlink(item.file_path, (err) => {
          if (err) console.log(err);
        });
      }

      return await this.db
        .database('directories')
        .delete('*')
        .where({ dir_id: dir_id })
        .catch((e) => {
          console.log(e);
        });
    } else
      throw new HttpException(
        {
          code: 'FieldEmpty',
          message: 'Directory does not exist',
          target: 'directories',
        },
        500,
      );
  }

  async getChildren(dir_id: number, owner: string) {
    const parent: { dir_name: string; dir_id: number } = { dir_id: dir_id, dir_name: '' };

    let rootDir;
    if (dir_id != null)
      rootDir = await this.db
        .database('directories')
        .select('*')
        .where({ dir_id: dir_id, owner: toBinaryUUID(owner as string) })
        .catch((e) => {
          throw new HttpException(
            {
              code: 'FieldEmpty',
              message: 'Directory does not exist',
              target: 'directories',
            },
            500,
          );
        });
    else
      rootDir = await this.db
        .database('directories')
        .select('*')
        .where({ parent_id: null, owner: toBinaryUUID(owner as string) })
        .catch((e) => {
          console.log(e);
          throw new HttpException(
            {
              code: 'FieldEmpty',
              message: 'Directory does not exist',
              target: 'directories',
            },
            500,
          );
        });

    parent.dir_id = rootDir[0].dir_id;
    parent.dir_name = rootDir[0].dir_name;

    const directories: Directory[] = await this.db
      .database<Directory>('directories')
      .select('*')
      .where('parent_id', '=', rootDir[0].dir_id)
      .orderBy('dir_name', 'asc')
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          {
            code: 'InnerError',
            message: 'Children could not be received',
            target: 'directories',
          },
          500,
        );
      });
    const files: FileEntry[] = await this.db
      .database<FileEntry>('files')
      .select('file_id', 'file_name', 'file_type', 'owner', 'parent_id')
      .where('parent_id', '=', rootDir[0].dir_id)
      .orderBy('file_name', 'asc')
      .catch((e) => {
        throw new HttpException(
          {
            code: 'InnerError',
            message: 'Children could not be received',
            target: 'files',
          },
          500,
        );
      });

    directories.forEach((item) => {
      item.owner = fromBinaryUUID(item.owner as Buffer);
    });
    files.forEach((item) => {
      item.owner = fromBinaryUUID(item.owner as Buffer);
    });

    return { files, directories, parent };
  }

  async getPath(dir_id: number) {
    const res = await this.db
      .database('directories')
      .join('relationships', 'directories.dir_id', 'relationships.parent_id')
      .select('directories.dir_name', 'directories.dir_id')
      .where('relationships.child_id', '=', dir_id)
      .whereNotNull('directories.parent_id')
      .orderBy('relationships.depth', 'desc')
      .catch((e) => {
        throw new HttpException(
          {
            code: 'InnerError',
            message: 'Path could not be received',
            target: 'directories',
          },
          500,
        );
      });

    return res;
  }

  async changeFileParent(file_id: number, parent_id: number) {
    return await this.db
      .database<FileEntry>('files')
      .update({ parent_id: parent_id })
      .where({ file_id: file_id })
      .catch((e) => {
        throw new HttpException(
          {
            code: 'InnerError',
            message: 'File could not be moved',
            target: 'directories',
          },
          500,
        );
      });
  }
}
