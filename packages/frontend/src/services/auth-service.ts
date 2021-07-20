import { gvmHttpErrorResponse, handleFetch, ROOT_URL } from '../utils/httpUtils';

import { User } from '../models/user.model';
import authStore from '../components/pages/app-auth/authStore';

class AuthServiceController {
  private user: User & { loggedIn: boolean } = { loggedIn: false, errors: new Map() };

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.clearErrors();
      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      fetch(ROOT_URL + 'auth/login', fetchData)
        .then(handleFetch)
        .then(data => {
          console.log(data);
          this.user.user_email = data.user_email;
          this.user.user_id = data.user_id;
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
      this.clearErrors();
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
          console.log(data);
          resolve('200');
        })
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
        });
    });
  }

  reset(token: string, password: string) {
    return new Promise((resolve, reject) => {
      this.clearErrors();
      const fetchData: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({ token: token, password: password }),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(ROOT_URL + 'auth/reset', fetchData)
        .then(handleFetch)
        .then(() => {
          resolve('200');
        })
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
        });
    });
  }

  requestReset(email: string) {
    return new Promise((resolve, reject) => {
      this.clearErrors();
      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(ROOT_URL + 'auth/reset', fetchData)
        .then(handleFetch)
        .then(() => {
          resolve('200');
        })
        .catch((e: gvmHttpErrorResponse) => {
          reject(e);
        });
      resolve('200');
    });
  }
  async getUser() {
    await this.checkStatus();
    return this.user;
  }

  checkStatus() {
    return new Promise((resolve, reject) => {
      this.clearErrors();
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
            console.log(e);
            reject(e);
          });
      } else resolve('200');
    });
  }
  clearErrors() {
    authStore.isError = false;
    authStore.errorText = '';
  }
}

export const AuthService = new AuthServiceController();
