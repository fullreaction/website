import { ROOT_URL } from '../utils/httpUtils';

import { User } from '../models/user.model';

class AuthServiceController {
  public error = { hasError: false, text: '' };
  private user: User & { loggedIn: boolean };

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      fetch(ROOT_URL + 'auth/login', fetchData)
        .then(e => e.json())
        .then(data => {
          this.user.user_email = data.email;
          this.user.user_id = data.id;
          this.user.loggedIn = true;
          resolve('200');
        })
        .catch(e => {
          this.error = { hasError: true, text: e.error.message };
          reject(this.error.text);
        });
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(ROOT_URL + 'auth/register', fetchData)
        .then(e => e.json())
        .then(data => {
          this.user.user_email = email;
          this.user.user_id = data;
          this.user.loggedIn = true;
          resolve('200');
        })
        .catch(e => {
          this.error = { hasError: true, text: e.error.message };
          reject(this.error.text);
        });
    });
  }

  reset(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const fetchData: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(ROOT_URL + 'auth/register', fetchData)
        .then(res => {
          console.log(res);
          resolve('200');
        })
        .catch(e => {
          this.error = { hasError: true, text: e.error.message };
          reject(this.error.text);
        });
    });
  }
  getUser() {
    return this.user;
  }

  checkStatus() {
    return new Promise((resolve, reject) => {
      if (!this.user.loggedIn) {
        const fetchData: RequestInit = {
          method: 'GET',

          credentials: 'include',
        };
        fetch(ROOT_URL + 'auth/status', fetchData)
          .then(e => e.json())
          .then(data => {
            this.user.user_email = data.email;
            this.user.user_id = data.id;
            this.user.loggedIn = true;
            resolve('200');
          })
          .catch(e => {
            this.error = { hasError: true, text: e.error.message };
            this.user.loggedIn = false;
            reject(this.error.text);
          });
      } else resolve('200');
    });
  }

  clearError() {
    this.error = { hasError: false, text: '' };
  }
}

export const AuthService = new AuthServiceController();
