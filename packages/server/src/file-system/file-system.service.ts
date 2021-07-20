import { HttpException, Injectable } from '@nestjs/common';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { Directory } from './file-system.models';

@Injectable()
export class FileSystemService {
  constructor(private readonly fileSystemDAO: FileSystemDAO) {}

  initUser(email: string) {
    this.fileSystemDAO.initUser(email);
  }

  addFile(file: File, directory: Directory) {
    this.fileSystemDAO.addFile(file, directory);
  }
  addDirectory(directory: Directory, parent: Directory) {
    this.fileSystemDAO.addDirectory(directory, parent);
  }

  async getChildren(dir: Directory) {
    return await this.fileSystemDAO.getChildren(dir);
  }
}
