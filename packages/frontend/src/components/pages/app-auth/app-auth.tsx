import { Component, h, Host, State } from '@stencil/core';
import { AuthService } from '../../../services/auth-service';

/*
  Things to think about:

  * Front end{
    * set up error logic
    * reset-complete url query

  }

  * Services {
    * Setting up @Injectable() yourself
    * Observables?
    * fetch() instead of httpClient {
      * learn how to read readableStream
    }
  }

  * gvmHttpErrorResponse{
      * extends angular HttpErrorResponse
      * uses angular HttpHeaders
  }



*/

// I'm not sure about <stencil-route-switch> but
// it seems to be working.

@Component({
  tag: 'app-auth',
  styleUrl: 'app-auth.css',
})
export class AppAuth {
  @State() url = window.location.pathname;

  private headers: Map<string, string> = new Map([
    ['/auth/login', 'Log in to your account'],
    ['/auth/register', 'Create Account'],
    ['/auth/reset', 'Reset password'], //reset-complete???
  ]);
  render = () => (
    <Host class="Auth-Host">
      <h2 class="Auth-Header Heading-2">{this.headers.get(this.url)}</h2>

      <stencil-route-switch scrollTopOffset={0}>
        <stencil-route url="/auth/login" component="app-login" />
        <stencil-route url="/auth/register" component="app-register" />
        <stencil-route url="/auth/reset" component="app-reset" />
        <stencil-route url="/auth/reset-complete" component="app-reset-complete" />
      </stencil-route-switch>

      <div class="Auth-Extra">
        <div class="Auth-Errors Text-1"> {AuthService.error.text} </div>
      </div>
    </Host>
  );
}
