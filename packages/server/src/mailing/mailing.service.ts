import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ContactDAO } from 'src/db';
import { MailChimp } from '../mailing/httpUtils/mailchimp';
@Injectable()
export class MailingService {
  constructor(private http: HttpService, private contactDAO: ContactDAO) {}

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
        MailChimp.MarketApi.rootUrl + 'lists/' + MailChimp.MarketApi.audienceId,
        mcDataPost,
        {
          headers: {
            Authorization: 'auth ' + MailChimp.MarketApi.apiKey,
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
    //
    const mcDataPost = JSON.stringify({
      key: MailChimp.TransactionApi.apiKey,
      message: {
        text: text,
        subject: 'Contact from ' + email,
        from_email: 'george.chankseliani@fullreaction.com',
        to: [{ email: 'george.chankseliani@fullreaction.com' }],
      },
    });
    const res = await this.http.post(
      MailChimp.TransactionApi.rootUrl + 'messages/send',
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
