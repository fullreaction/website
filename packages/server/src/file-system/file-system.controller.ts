import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Directory } from './file-system.models';
import { FileSystemService } from './file-system.service';

/*
  * Items in single directory can't have the same name
  * Files
  * Change name, properties, stuff
  * TEST EVERYTHING

*/

@Controller('filesystem')
export class FileSystemController {
  constructor(private readonly fileSystem: FileSystemService) {}

  @Get('file')
  async getFile() {
    //
  }

  @Post('uploadfile')
  async uploadFile() {
    //
  }

  @Post('getdir')
  async getDirectory(@Body('dir') directory: Directory) {
    return this.fileSystem.getChildren(directory);
  }

  @Post('makedir')
  async uploadDirectory(@Body('dir') directory: Directory, @Body('parent') parent: Directory) {
    return this.fileSystem.addDirectory(directory, parent);
  }
  @Post('removeDir')
  async removeDirectory(@Body('dir') directory: Directory) {
    return this.fileSystem.removeDirectory(directory);
  }
}
