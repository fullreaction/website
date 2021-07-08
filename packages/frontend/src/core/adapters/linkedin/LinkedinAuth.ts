import {AuthBase} from '../../base';

// @ts-ignore
interface ResponseError {
  error: 'user_cancelled_login' | 'user_cancelled_authorize';
  error_description: string;
  state: string;
}

export class LinkedinAuth extends AuthBase {
  fetch(url: string, params: Record<string, any>): any {
    return { url, params };
  }

  userAuthorization(): any {
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      state: 'secret-4321',
      scope: 'w_member_social,r_liteprofile',
    };
    return this.fetch('authorization', params);
  }

  getUserAccessToken(): { access_token: string; expires_in: number } {
    const params = {
      grant_type: 'authorization_code',
      code: USER_CODE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URL,
    };

    return this.fetch('accessToken', params);
  }

  //https://docs.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens?context=linkedin/context
  refreshAccessToken() {

  }
}
