import { Observable } from 'rxjs';
import { ROOT_URL } from '../utils/httpUtils';

import { User } from '../models/user.model';

// @Injectable({ providedIn: 'root' })
export class AuthService {
  public error = { hasError: false, text: '' };
  private user: User = { loggedIn: false };

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      fetch(ROOT_URL + '/auth/login', fetchData)
        .then(e => {
          this.user.email = e.email;
          this.user.id = e.id;
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
      const res = this.http.post<number>(ROOT_URL + '/auth/register', {
        email,
        password,
      });

      res.subscribe({
        next: (e: number) => {
          this.user.email = email;
          this.user.loggedIn = true;
          this.user.id = e;
          resolve('200');
        },
        error: (e: gvmHttpErrorResponse) => {
          this.error = { hasError: true, text: e.error.message };
          reject(this.error.text);
        },
      });
    });
  }

  reset(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const res = this.http.patch(ROOT_URL + '/auth/reset', {
        email: email,
        password: password,
      });
      res.subscribe({
        complete: () => {
          resolve('200');
        },
        error: (e: gvmHttpErrorResponse) => {
          this.error = { hasError: true, text: e.error.message };
          reject(this.error.text);
        },
      });
    });
  }
  getUser() {
    return this.user;
  }

  checkStatus() {
    return new Promise((resolve, reject) => {
      if (!this.user.loggedIn) {
        const res: Observable<User> = this.http.get<User>(ROOT_URL + '/auth/status', {
          withCredentials: true,
        });
        res.subscribe({
          next: e => {
            this.user.email = e.email;
            this.user.id = e.id;
            this.user.loggedIn = true;
            console.log(this.user.loggedIn);
            resolve('200');
          },
          error: (e: gvmHttpErrorResponse) => {
            this.error = { hasError: true, text: e.error.message };
            this.user.loggedIn = false;
            reject(this.error.text);
          },
        });
      }
    });
  }

  clearError() {
    this.error = { hasError: false, text: '' };
  }
}
