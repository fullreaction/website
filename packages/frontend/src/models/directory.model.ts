import { User } from './user.model';

export interface Directory {
  owner: User;
  name?: string;
  parent_id?: number;
  id?: number;
}
