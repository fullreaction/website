import { AxiosService, gvmHttpErrorResponse } from '../utils/httpUtils';
import { User } from '../models/user.model';
import authStore from '../components/pages/app-auth/authStore';

class AuthServiceController {
  private user: User & { loggedIn: boolean } = { loggedIn: false, errors: new Map() };

  async login(email: string, password: string) {
    this.clearErrors();

    const data = await AxiosService.post('auth/login', JSON.stringify({ email, password }))
      .then(AxiosService.handleFetch)
      .catch((e: gvmHttpErrorResponse) => {
        throw e;
      });
    this.user.user_email = data.user_email;
    this.user.user_id = data.user_id;
    this.user.loggedIn = true;
  }

  async register(email: string, password: string) {
    this.clearErrors();

    this.user.user_id = await AxiosService.post('auth/register', JSON.stringify({ email, password }))
      .then(AxiosService.handleFetch)
      .catch((e: gvmHttpErrorResponse) => {
        throw e;
      });
    this.user.user_email = email;
    this.user.loggedIn = true;
  }

  async reset(token: string, password: string) {
    this.clearErrors();

    await AxiosService.patch('auth/reset', JSON.stringify({ token: token, password: password }));
  }

  async requestReset(email: string) {
    this.clearErrors();

    await AxiosService.post('auth/reset', JSON.stringify({ email }));
  }
  async getUser() {
    await this.checkStatus();
    return this.user;
  }

  async checkStatus() {
    this.clearErrors();
    if (!this.user.loggedIn) {
      const data = await AxiosService.get('auth/status', { withCredentials: true })
        .then(AxiosService.handleFetch)
        .catch((e: gvmHttpErrorResponse) => {
          throw e;
        });

      this.user.user_email = data.email;
      this.user.user_id = data.id;
      this.user.loggedIn = true;
    }
  }
  clearErrors() {
    authStore.isError = false;
    authStore.errorText = '';
  }
}

export const AuthService = new AuthServiceController();
