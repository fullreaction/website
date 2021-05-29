import { Injectable } from '@nestjs/common';
import { db } from '..';

// Contact Data Access Object

// NOTICE: .returning() isn't supported by mysql

@Injectable()
export class ContactDAO {
  async pushNew(email: string, text: string) {
    //
    await db('contacts').insert({
      contact_email: email,
      contact_message: text,
    });
  }
}
