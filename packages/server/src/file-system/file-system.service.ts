import { HttpException, Injectable } from '@nestjs/common';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { Directory, FileEntry } from './file-system.models';

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(email: string) {
    this.fileSystemDAO.initUser(email);
  }

  async addFile(file: Express.Multer.File, directory: Directory) {
    this.fileSystemDAO.addFile(file, directory);
  }
  async getFile(file_id: number) {
    return await this.fileSystemDAO.getFile(file_id);
  }
  async changeFileName(file: FileEntry, name: string) {
    this.fileSystemDAO.changeFileName(file, name);
  }
  async removeFile(file_id: number) {
    this.fileSystemDAO.removeFile(file_id);
  }
  async addDirectory(directory: Directory, parent: Directory) {
    this.fileSystemDAO.addDirectory(directory, parent);
  }
  async changeDirectoryName(directory: Directory, name: string) {
    this.fileSystemDAO.changeDirectoryName(directory, name);
  }
  async removeDirectory(directory: Directory) {
    this.fileSystemDAO.removeDirectory(directory);
  }

  async getChildren(directory: Directory) {
    return await this.fileSystemDAO.getChildren(directory);
  }
}
