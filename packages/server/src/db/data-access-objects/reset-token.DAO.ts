import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../dbService';

// Reset token Data Access Object

/*
  needs strongtyping
  catch not_unique error

*/

@Injectable()
export class ResetTokenDAO {
  constructor(private db: DatabaseService) {}
  async createNew(email: string) {
    const token = this.generateToken(32);
    await this.db.database('password_reset_tokens').insert({
      email: email,
      token: token,
    });
    return token;
  }

  async getField(token: string) {
    return await this.db
      .database('password_reset_tokens')
      .select('token', 'email')
      .where({ token: token })
      .andWhere(
        this.db.database.raw('created_at < CURRENT_TIME() - 10/(24*60)'),
      )
      .first();
  }
  async deleteToken(token: string) {
    console.log(token);
    await this.db
      .database('password_reset_tokens')
      .where({ token: token })
      .delete();
  }

  async continualSweep() {
    setInterval(async () => {
      await this.db
        .database('password_reset_tokens')
        .where(
          this.db.database.raw('created_at >= CURRENT_TIME() - 10/(24*60)'),
        )
        .delete();
    }, 86400000); // Once per 24 hours
  }

  generateToken(length: number) {
    const a =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
        '',
      );
    const b = [];
    for (let i = 0; i < length; i++) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join('');
  }
}
