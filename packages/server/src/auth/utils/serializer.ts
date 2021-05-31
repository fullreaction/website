import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const dbUser = await this.userService.findOne(user.user_email);

    return dbUser ? done(null, dbUser) : done(null, null);
  }
}
