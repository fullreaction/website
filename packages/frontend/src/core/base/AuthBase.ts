export abstract class AuthBase {
  protected constructor(public props) {}

  abstract userAuthorization(): Promise<void>;

  fetch(url: string, params: Record<string, any>): any {
    return { url, params };
  }
}
