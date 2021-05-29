import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDAO } from 'src/db';
/*
  tasks:
    * Think about how DB environment variables
      will work with knexjs migrations.



  Issues:
    * process.env.DB_... variables come up undefined in knexfile
    * nestjs config needs to be injected into something to work

*/
@Injectable()
export class MailingService {
  private Mailchimp: { apikey: string; url: string; audienceId: string } = {
    ...this.cfgService.get('mailchimp'),
    url: 'https://us6.api.mailchimp.com/3.0/',
  };
  private Mandrill: { apikey: string; url: string; email: string } = {
    ...this.cfgService.get('mandrill'),
    url: 'https://mandrillapp.com/api/1.0/',
  };
  constructor(
    private http: HttpService,
    private contactDAO: ContactDAO,
    private cfgService: ConfigService,
  ) {}

  async signup(email: string) {
    if (email) {
      const mcDataPost = JSON.stringify({
        members: [
          {
            email_address: email,
            status: 'pending', //If we don't want double opt-in use 'subscribed'
          },
        ],
      });

      const res = await this.http.post(
        this.Mailchimp.url + 'lists/' + this.Mailchimp.audienceId,
        mcDataPost,
        {
          headers: {
            Authorization: 'auth ' + this.Mailchimp.apikey,
          },
        },
      );
      res.subscribe({
        next: (e) => {
          console.log(e);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else
      throw new HttpException(
        {
          code: 'BadArgument',
          message: 'Email was not specified',
          target: 'email',
        },
        500,
      );
  }

  async contact(email: string, text: string) {
    const recEmail = this.Mandrill.email;
    const mcDataPost = JSON.stringify({
      key: this.Mandrill.apikey,
      message: {
        text: text,
        subject: 'Contact from ' + email,
        from_email: recEmail,
        to: [{ email: recEmail }],
      },
    });
    const res = await this.http.post(
      this.Mandrill.url + 'messages/send',
      mcDataPost,
    );
    res.subscribe({
      next: (e) => {
        console.log(e);
        this.contactDAO.pushNew(email, text);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
