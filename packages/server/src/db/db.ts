import { development } from './knexfile';
import knex from 'knex';

export const db = knex(development);
