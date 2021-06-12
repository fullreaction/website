import { Module, HttpModule } from '@nestjs/common';
import { ContactDAO } from 'src/db';
import { ResetTokenDAO } from 'src/db/data-access-objects/reset-token.DAO';
import { DatabaseService } from 'src/db/dbService';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
@Module({
  controllers: [MailingController],
  providers: [MailingService, ContactDAO, DatabaseService, ResetTokenDAO],
  imports: [HttpModule],
  exports: [MailingService],
})
export class MailingModule {}
