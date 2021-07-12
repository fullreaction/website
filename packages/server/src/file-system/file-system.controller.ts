import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Directory } from './file-system.models';
import { FileSystemService } from './file-system.service';

/*
  * Items in single directory can't have the same name
  * Turn fixRelationships into a trigger



  * TEST EVERYTHING

*/

@Controller('filesystem')
export class FileSystemController {
  constructor(private readonly fileSystem: FileSystemService) {}

  @Get('file')
  async getFile() {
    //
  }

  @Post('getdir')
  async getDir(@Body('dir') dir: Directory) {
    return this.fileSystem.getChildren(dir);
  }

  @Post('file')
  async uploadFile(@Req() req: Request) {
    const data = req.body;
    if (data.file) return 'OK';
    else return 'No File';
  }

  @Post('dir')
  async uploadDirectory(@Body('dir') dir: Directory, @Body('parent') parent: Directory) {
    console.log(dir);
    return this.fileSystem.addDirectory(dir, parent);
  }
}
