import { Delete, Param, Patch, Res } from '@nestjs/common';
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileSystemService } from './file-system.service';

// Make a patch function called changefileparent
// Get file_id, new parent_id

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
  async postFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('dir_id') dir_id: string,
    @Body('owner') owner: string,
  ) {
    await this.fileSystem.addFile(file, parseInt(dir_id), owner);
  }

  @Patch('changefilename')
  async changeFileName(@Body('file_id') file_id: number, @Body('name') name: string) {
    await this.fileSystem.changeFileName(file_id, name);
  }

  @Delete('deletefile/:id')
  async removeFile(@Param('id') file_id: number) {
    await this.fileSystem.removeFile(file_id);
  }

  @Post('getdir')
  async getChildren(@Body('dir_id') dir_id: number, @Body('owner') owner: string) {
    const res = await this.fileSystem.getChildren(dir_id, owner);
    return res;
  }

  @Post('makedir')
  async makeDirectory(
    @Body('dir_name') dir_name: string,
    @Body('owner') owner: string,
    @Body('parent_id') parent_id: number,
  ) {
    await this.fileSystem.addDirectory(dir_name, owner, parent_id);
  }

  @Patch('changedirname')
  async changeDirectoryName(@Body('dir_id') dir_id: number, @Body('name') name: string) {
    return await this.fileSystem.changeDirectoryName(dir_id, name);
  }
  @Get('getpath/:id')
  async getPath(@Param('id') dir_id: number) {
    return await this.fileSystem.getPath(dir_id);
  }
  @Delete('removedir')
  async removeDirectory(@Body('dir_id') dir_id: number) {
    return await this.fileSystem.removeDirectory(dir_id);
  }
  @Get('checkheritage/:dirOne/:dirTwo')
  async checkHeritage(@Param('dirOne') dirOne: number, @Param('dirTwo') dirTwo: number) {
    return await this.fileSystem.checkHeritage(dirOne, dirTwo);
  }
  @Patch('changefileparent')
  async changeFileParent(@Body('file_id') file_id: number, @Body('parent_id') parent_id: number) {
    return await this.fileSystem.changeFileParent(file_id, parent_id);
  }
}
