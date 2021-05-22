import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailService: MailingService) {}

  @Post('contact')
  async contact(@Body('email') email: string, @Body('text') text: string) {
    return text;
  }

  @Post('signup')
  async signup(@Body('email') email: string) {
    return email;
  }

  @Get('contact')
  testing() {
    return 'Yep';
  }
}
