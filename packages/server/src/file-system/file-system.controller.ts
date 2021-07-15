import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Directory } from './file-system.models';
import { FileSystemService } from './file-system.service';

/*

  * Use binary(16) instead of varbinary(16) for user_id
  * Change binary to string when getting user_id and its references
  * Items in single directory can't have the same name
  * Files
  * Change name, properties, stuff
  * TEST EVERYTHING

*/

@Controller('filesystem')
export class FileSystemController {
  constructor(private readonly fileSystem: FileSystemService) {}

  @Get('getfile')
  async getFile() {
    //
  }

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploadedFiles' }))
  async postFile(@UploadedFile() file: Express.Multer.File, @Body('dir') directory: Directory) {
    this.fileSystem.addFile(file, directory);
  }

  @Post('getdir')
  async getDirectory(@Body('dir') directory: Directory) {
    return await this.fileSystem.getChildren(directory);
  }

  @Post('makedir')
  async uploadDirectory(@Body('dir') directory: Directory, @Body('parent') parent: Directory) {
    console.log(directory);
    return this.fileSystem.addDirectory(directory, parent);
  }
  @Post('removeDir')
  async removeDirectory(@Body('dir') directory: Directory) {
    return this.fileSystem.removeDirectory(directory);
  }
}
