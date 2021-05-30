import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex from 'knex';

@Injectable()
export class DatabaseService {
  public database = knex(this.cfg.get('database'));
  constructor(private cfg: ConfigService) {}
}
