import { User } from 'src/auth/users/user.model';

export interface Directory {
  owner: User;
  name: string;
  id: number;
}
