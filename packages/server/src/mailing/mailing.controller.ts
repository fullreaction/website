import { Body, Controller, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailService: MailingService) {}

  @Post('signup')
  async signup(@Body('email') email: string) {
    this.mailService.signup(email);
  }

  @Post('contact')
  async contact(@Body('email') email: string, @Body('text') text: string) {
    this.mailService.contact(email, text);
  }
}
