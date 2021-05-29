import { Module, HttpModule } from '@nestjs/common';
import { ContactDAO } from 'src/db';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
@Module({
  controllers: [MailingController],
  providers: [MailingService, ContactDAO],
  imports: [HttpModule],
})
export class MailingModule {}
