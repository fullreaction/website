import { Module, HttpModule } from '@nestjs/common';
import { FileSystemController } from './file-system.controller';
import { FileSystemService } from './file-system.service';

@Module({
  controllers: [FileSystemController],
  providers: [FileSystemService],
  imports: [HttpModule],
  exports: [],
})
export class MailingModule {}
