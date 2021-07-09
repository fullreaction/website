import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../dbService';

// Contact Data Access Object

@Injectable()
export class ContactDAO {
  constructor(private db: DatabaseService) {}
  async pushNew(email: string, text: string) {
    return await this.db.database('contacts').insert({
      contact_email: email,
      contact_message: text,
    });
  }
}
