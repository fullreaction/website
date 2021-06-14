import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/users/user.model';
import { ContactDAO } from 'src/db';
import { ResetTokenDAO } from 'src/db/data-access-objects/reset-token.DAO';
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
    private tokenDAO: ResetTokenDAO,
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
    const mcDataPost = JSON.stringify({
      key: this.Mandrill.apikey,
      message: {
        text: text,
        subject: 'Contact from ' + email,
        from_email: this.Mandrill.email,
        to: [{ email: this.Mandrill.email }],
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

  // One sentence + link is easier as string I think
  // I'd like to write up a fully decorated one later
  async sendResetEmail(user: User | string) {
    const mcData = {
      key: this.Mandrill.apikey,

      message: {
        subject: 'FullReaction password reset',
        from_email: this.Mandrill.email,
        from_name: 'Giorgi',
        to: '',
        text: '',
      },
    };
    if (typeof user === 'string') {
      mcData.message.to = user;
      mcData.message.text =
        "Hello, we've received a request to reset a password for a FullReaction account with this email, though no such account exists. etc etc";
    } else {
      mcData.message.to = user.user_email;
      const token = await this.tokenDAO.createNew(user.user_email);
      mcData.message.text =
        'Hello, here is a link to reset your FullReaction password \n http://localhost:3333/auth/reset-complete?token=' +
        token;
    }
    const mcDataPost = JSON.stringify(mcData);

    const res = await this.http.post(
      this.Mandrill.url + 'messages/send',
      mcDataPost,
    );
    res.subscribe({
      next: (e) => {
        console.log(e);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
