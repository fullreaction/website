import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.model';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { Directory, FileEntry } from './file-system.models';

// Make a patch function called changefileparent
// Get file_id, new parent_id

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(user: User) {
    this.fileSystemDAO.initUser(user);
  }

  async addFile(file: Express.Multer.File, dir_id: number, owner: string) {
    await this.fileSystemDAO.addFile(file, dir_id, owner);
  }
  async getFile(file_id: number) {
    return await this.fileSystemDAO.getFile(file_id);
  }
  async changeFileName(file_id: number, name: string) {
    await this.fileSystemDAO.changeFileName(file_id, name);
  }
  async removeFile(file_id: number) {
    await this.fileSystemDAO.removeFile(file_id);
  }
  async addDirectory(dir_name: string, owner: string, parent_id: number) {
    await this.fileSystemDAO.addDirectory(dir_name, owner, parent_id);
  }
  async changeDirectoryName(dir_id: number, name: string) {
    await this.fileSystemDAO.changeDirectoryName(dir_id, name);
  }
  async removeDirectory(dir_id: number) {
    return await this.fileSystemDAO.removeDirectory(dir_id);
  }

  async getChildren(dir_id: number, owner: string) {
    return await this.fileSystemDAO.getChildren(dir_id, owner);
  }
  async getPath(dir_id: number) {
    return await this.fileSystemDAO.getPath(dir_id);
  }
  
  async changeFileParent(file_id: number, parent_id: number) {
    return await this.fileSystemDAO.changeFileParent(file_id, parent_id)
  }
}
