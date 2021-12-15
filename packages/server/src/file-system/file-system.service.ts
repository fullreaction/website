import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.model';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';

// Make a patch function called changefileparent
// Get file_id, new parent_id

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(user: User) {
    this.fileSystemDAO.initUser(user).catch((e) => {
      throw e;
    });
  }

  async addFile(file: Express.Multer.File, dir_id: number, owner: string) {
    await this.fileSystemDAO.addFile(file, dir_id, owner).catch((e) => {
      throw e;
    });
  }
  async getFile(file_id: number) {
    return await this.fileSystemDAO.getFile(file_id).catch((e) => {
      throw e;
    });
  }
  async changeFileName(file_id: number, name: string) {
    await this.fileSystemDAO.changeFileName(file_id, name).catch((e) => {
      throw new HttpException(e.response, e.status);
    });
  }
  async removeFile(file_id: number) {
    await this.fileSystemDAO.removeFile(file_id).catch((e) => {
      throw e;
    });
  }
  async addDirectory(dir_name: string, owner: string, parent_id: number) {
    await this.fileSystemDAO.addDirectory(dir_name, owner, parent_id).catch((e) => {
      throw e;
    });
  }
  async changeDirectoryName(dir_id: number, name: string) {
    await this.fileSystemDAO.changeDirectoryName(dir_id, name).catch((e) => {
      throw e;
    });
  }
  async removeDirectory(dir_id: number) {
    return await this.fileSystemDAO.removeDirectory(dir_id).catch((e) => {
      throw e;
    });
  }

  async getChildren(dir_id: number, owner: string) {
    return await this.fileSystemDAO.getChildren(dir_id, owner).catch((e) => {
      throw e;
    });
  }
  async getPath(dir_id: number) {
    return await this.fileSystemDAO.getPath(dir_id).catch((e) => {
      throw e;
    });
  }
  async checkHeritage(dirOne: number, dirTwo: number) {
    return await this.fileSystemDAO.checkHeritage(dirOne, dirTwo).catch((e) => {
      throw e;
    });
  }
  async changeFileParent(file_id: number, parent_id: number) {
    return await this.fileSystemDAO.changeFileParent(file_id, parent_id).catch((e) => {
      throw e;
    });
  }
}
