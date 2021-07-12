import { User } from '../models/user.model';
import axios from 'axios';

export const AuthEndpoints = {
  login: (email: User['user_email'], password: User['user_pass']) => {
    return axios.post<User, User>('/auth/login', { email, password });
  },

  //TODO server implementation
  logOut: () => {
    return axios.get('/auth/logout');
  },

  register: (email: User['user_email'], password: User['user_pass']) => {
    return axios.post<User>('/auth/register', { email, password });
  },

  reset: (token: string, password: User['user_pass']) => {
    return axios.patch('/auth/reset', { token, password });
  },

  requestReset: (email: User['user_email']) => {
    return axios.post('/auth/reset', { email });
  },

  checkStatus: () => {
    return axios.get('/auth/status');
  },
};
