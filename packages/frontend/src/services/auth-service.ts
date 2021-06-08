import { gvmHttpErrorResponse, handleFetch, ROOT_URL } from '../utils/httpUtils';

import { User } from '../models/user.model';

// caught errors are empty

class AuthServiceController {
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
        .then(handleFetch)
        .then(data => {
          this.user.user_email = data.email;
          this.user.user_id = data.id;
          this.user.loggedIn = true;
          console.log(this.user);
          resolve('200');
        })
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
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
        .then(handleFetch)
        .then(data => {
          this.user.user_email = email;
          this.user.user_id = data;
          this.user.loggedIn = true;
          resolve('200');
        })
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
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
      fetch(ROOT_URL + 'auth/reset', fetchData)
        .then(handleFetch)
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
        });
      resolve('200');
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
          .then(handleFetch)
          .then(data => {
            this.user.user_email = data.email;
            this.user.user_id = data.id;
            this.user.loggedIn = true;
            resolve('200');
          })
          .catch((e: gvmHttpErrorResponse) => {
            reject(e);
          });
      } else resolve('200');
    });
  }
}

export const AuthService = new AuthServiceController();
