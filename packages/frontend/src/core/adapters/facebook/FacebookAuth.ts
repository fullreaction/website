import { AuthBase } from '../../base';

export class FacebookAuth extends AuthBase {
  userAuthorization(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
