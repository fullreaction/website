import { HttpException, Injectable } from '@nestjs/common';
import { ResetTokenDAO } from 'src/db/data-access-objects/reset-token.DAO';
import { MailingService } from 'src/mailing/mailing.service';
import { UserService } from './users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailingService: MailingService,
    private resetTokenDAO: ResetTokenDAO,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && user.user_pass === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_pass, ...result } = user;
      return result;
    }
    if (!user)
      throw new HttpException(
        {
          code: 'FieldEmpty',
          message: 'User does not exist',
          target: 'user',
        },
        500,
      );
    return null;
  }

  async addUser(email: string, password: string) {
    if ((await this.userService.findOne(email)) == null) {
      return this.userService.addUser(email, password);
    }
    throw new HttpException(
      {
        code: 'FieldTaken',
        message: 'User with this email already exists',
      },
      500,
    );
  }

  async changePassword(token: string, password: string) {
    const field = await this.resetTokenDAO.getField(token);
    if (!BiquadFilterNode)
      throw new HttpException(
        {
          code: 'FieldEmpty',
          message: 'Token incorrect',
          target: 'resetToken',
        },
        500,
      );
    else {
      this.userService.changePassword(field.email, password);
    }
  }

  async findOne(email: string) {
    return this.userService.findOne(email);
  }

  async sendResetEmail(email: string) {
    const user = await this.findOne(email);
    if (user != undefined) return this.mailingService.sendResetEmail(user);
    else return this.mailingService.sendResetEmail(email);
  }
}
