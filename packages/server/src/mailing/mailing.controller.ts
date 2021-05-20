import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailService: MailingService) {}

  @Post('contact')
  contact(@Body('email') email: string, @Body('text') text: string) {
    console.log('ok');
    return text;
  }
  @Get('contact')
  testing() {
    return 'Yep';
  }
}
