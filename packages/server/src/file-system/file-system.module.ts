import { Module, HttpModule } from '@nestjs/common';
import { DatabaseService } from 'src/db';
import { FileSystemDAO } from 'src/db/data-access-objects/file-system.DAO';
import { FileSystemController } from './file-system.controller';
import { FileSystemService } from './file-system.service';

@Module({
  controllers: [FileSystemController],
  providers: [FileSystemService, DatabaseService, FileSystemDAO, FileSystemService],
  imports: [HttpModule],
  exports: [FileSystemDAO, FileSystemService],
})
export class FileSystemModule {}
