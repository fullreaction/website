import { HttpException, Injectable } from '@nestjs/common';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { Directory } from './file-system.models';

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(email: string) {
    this.fileSystemDAO.initUser(email);
  }

  async addFile(file: Express.Multer.File, directory: Directory) {
    return await this.fileSystemDAO.addFile(file, directory);
  }
  async addDirectory(directory: Directory, parent: Directory) {
    return await this.fileSystemDAO.addDirectory(directory, parent);
  }
  async removeDirectory(directory: Directory) {
    return await this.fileSystemDAO.removeDirectory(directory);
  }

  async getChildren(directory: Directory) {
    return await this.fileSystemDAO.getChildren(directory);
  }
}
