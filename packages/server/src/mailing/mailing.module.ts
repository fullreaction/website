import { Module, HttpModule } from '@nestjs/common';
import { ContactDAO } from 'src/db';
import { DatabaseService } from 'src/db/dbService';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
@Module({
  controllers: [MailingController],
  providers: [MailingService, ContactDAO, DatabaseService],
  imports: [HttpModule],
  exports: [MailingService],
})
export class MailingModule {}
