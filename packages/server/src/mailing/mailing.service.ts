import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDAO } from 'src/db';
/*

  * Make prod and dev .env files
  * Think about how DB environment variables
    will work with knexjs migrations.



Issues:
  * npm run start:dev not working correctly,
    --watch doesn't function.

*/
@Injectable()
export class MailingService {
  private MailchimpURL = 'https://us6.api.mailchimp.com/3.0/';
  private MandrillURL = 'https://mandrillapp.com/api/1.0/';
  constructor(
    private http: HttpService,
    private contactDAO: ContactDAO,
    private cfgService: ConfigService,
  ) {
    console.log(cfgService.get('MAILCHIMP_APIKEY'));
  }

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
        this.MailchimpURL +
          'lists/' +
          this.cfgService.get('MAILCHIMP_AUDIENCEID'),
        mcDataPost,
        {
          headers: {
            Authorization: 'auth ' + this.cfgService.get('MAILCHIMP_APIKEY'),
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
    const recEmail = this.cfgService.get('MANDRILL_EMAIL');
    const mcDataPost = JSON.stringify({
      key: this.cfgService.get('MANDRILL_APIKEY'),
      message: {
        text: text,
        subject: 'Contact from ' + email,
        from_email: recEmail,
        to: [{ email: recEmail }],
      },
    });
    const res = await this.http.post(
      this.MandrillURL + 'messages/send',
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
