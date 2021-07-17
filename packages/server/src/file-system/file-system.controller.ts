import { Delete, Param, Patch, Query, Res } from '@nestjs/common';
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Directory, FileEntry } from './file-system.models';
import { FileSystemService } from './file-system.service';

/*

  * Use binary(16) instead of varbinary(16) for user_id
  * Change binary to string when getting user_id and its references
  * Items in single directory can't have the same name
  * Change directory and file names
  * Files
  * Change name, properties, stuff
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
  async changeDirName(@Body('dir') directory: Directory, @Body('name') name: string) {
    //
  }
  @Delete('removeDir')
  async removeDirectory(@Body('dir') directory: Directory) {
    return this.fileSystem.removeDirectory(directory);
  }
}
