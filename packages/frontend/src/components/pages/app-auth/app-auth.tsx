import { Component, h, Host, State } from '@stencil/core';
import authStore from './authStore';

/*
  Things to think about:

  * Front end {
    * way to get to and from auth components

  }

  Issues:



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
    ['/auth/reset', 'Reset password'],
    ['/auth/reset-complete', 'Reset password'],
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
        <span class="Auth-Errors Text-1"> {authStore.errorText} </span>
      </div>
    </Host>
  );
}
