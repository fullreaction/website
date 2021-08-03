import { Injectable } from '@nestjs/common';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { Directory, FileEntry } from './file-system.models';

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(email: string) {
    this.fileSystemDAO.initUser(email);
  }

  async addFile(file: Express.Multer.File, dir_id: number, owner: string) {
    this.fileSystemDAO.addFile(file, dir_id, owner);
  }
  async getFile(file_id: number) {
    return await this.fileSystemDAO.getFile(file_id);
  }
  async changeFileName(file_id: number, name: string) {
    this.fileSystemDAO.changeFileName(file_id, name);
  }
  async removeFile(file_id: number) {
    this.fileSystemDAO.removeFile(file_id);
  }
  async addDirectory(dir_name: string, owner: string, parent_id: number) {
    this.fileSystemDAO.addDirectory(dir_name, owner, parent_id);
  }
  async changeDirectoryName(dir_id: number, name: string) {
    this.fileSystemDAO.changeDirectoryName(dir_id, name);
  }
  async removeDirectory(dir_id: number) {
    this.fileSystemDAO.removeDirectory(dir_id);
  }

  async getChildren(dir_id: number, owner: string) {
    return await this.fileSystemDAO.getChildren(dir_id, owner);
  }

  async getSkeleton(dir_id: number, owner: string) {
    return await this.fileSystemDAO.getSkeleton(dir_id, owner);
  }
}
