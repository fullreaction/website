import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/guards';
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
    return 'Got file';
  }

  @Get('directory')
  async getDir() {
    return 'Got Dir';
  }

  @Post('file')
  async uploadFile(@Req() req: Request) {
    const data = req.body;
    if (data.file) return 'OK';
    else return 'No File';
  }

  @Post('directory')
  async uploadDirectory(@Req() req: Request) {
    const data = req.body;
    if (data.directory) return 'OK';
    else return 'No File';
  }
}
