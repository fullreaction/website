import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../dbService';

// Contact Data Access Object

// NOTICE: .returning() isn't supported by mysql

@Injectable()
export class ContactDAO {
  constructor(private db: DatabaseService) {}
  async pushNew(email: string, text: string) {
    await this.db.database('contacts').insert({
      contact_email: email,
      contact_message: text,
    });
  }
}
