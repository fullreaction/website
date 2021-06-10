import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../dbService';

// Reset token Data Access Object

// needs strongtyping

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
      .where({ token: token })
      .first();
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
