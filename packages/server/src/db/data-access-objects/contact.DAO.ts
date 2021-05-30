import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex from 'knex';

// Contact Data Access Object

// NOTICE: .returning() isn't supported by mysql

@Injectable()
export class ContactDAO {
  private db = knex(this.cfgService.get('database'));

  constructor(private cfgService: ConfigService) {}
  async pushNew(email: string, text: string) {
    await this.db('contacts').insert({
      contact_email: email,
      contact_message: text,
    });
  }
}
