import { createStore } from '@stencil/store';
import { User } from '../models/user.model';

export const store = createStore<{ user: User | null }>({
  user: null,
});
