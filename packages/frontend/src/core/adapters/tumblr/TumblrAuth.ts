import { AuthBase } from '../../base';

export class TumblrAuth extends AuthBase {
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

  refreshAccessToken() {}
}
