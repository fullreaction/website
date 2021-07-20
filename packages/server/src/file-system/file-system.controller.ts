import { Delete, Param, Patch, Res } from '@nestjs/common';
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Directory, FileEntry } from './file-system.models';
import { FileSystemService } from './file-system.service';

/*

  * TEST EVERYTHING

*/

@Controller('filesystem')
export class FileSystemController {
  constructor(private readonly fileSystem: FileSystemService) {}

  @Get('getfile/:id')
  async getFile(@Res() res: Response, @Param('id') file_id: number) {
    const filePath = await this.fileSystem.getFile(file_id);
    const f = createReadStream(join(process.cwd(), filePath));
    f.pipe(res); // There is no StreamableFile in nestjs/common
  }

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploadedFiles' }))
  async postFile(@UploadedFile() file: Express.Multer.File, @Body('dir') directory: string) {
    console.log(directory);
    this.fileSystem.addFile(file, JSON.parse(directory));
  }
  @Patch('changefilename')
  async changeFileName(file: FileEntry, name: string) {
    this.fileSystem.changeFileName(file, name);
  }

  @Delete('deletefile/:id')
  async removeFile(@Param('id') file_id: number) {
    this.fileSystem.removeFile(file_id);
  }
  @Post('getdir')
  async getDirectory(@Body('dir') directory: Directory) {
    return await this.fileSystem.getChildren(directory);
  }

  @Post('makedir')
  async uploadDirectory(@Body('dir') directory: Directory, @Body('parent') parent: Directory) {
    return this.fileSystem.addDirectory(directory, parent);
  }
  @Patch('changedirname')
  async changeDirectoryName(@Body('dir') directory: Directory, @Body('name') name: string) {
    this.fileSystem.changeDirectoryName(directory, name);
  }
  @Delete('removeDir')
  async removeDirectory(@Body('dir') directory: Directory) {
    return this.fileSystem.removeDirectory(directory);
  }
}
