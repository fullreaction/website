import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { gvmHttpErrorResponse } from '../../../../utils/httpUtils';
import authStore from '../authStore';

@Component({
  tag: 'app-login',
  styleUrl: '../app-auth.css',
})
export class AppLogin {
  @State() email: string;
  @State() password: string;

  login(e) {
    e.preventDefault();
    AuthService.login(this.email, this.password).catch((e: gvmHttpErrorResponse) => {
      console.log(e);
      authStore.isError = true;
      authStore.errorText = e.message;
    });
  }
  render = () => (
    <form class="Auth-Form" onSubmit={e => this.login(e)}>
      <input
        type="email"
        class="Auth-Input InputText"
        value={this.email}
        onInput={e => (this.email = (e.target as HTMLInputElement).value)}
        placeholder="Email address"
        required
      ></input>
      <input
        type="password"
        class="Auth-Input InputText"
        value={this.password}
        onInput={e => (this.password = (e.target as HTMLInputElement).value)}
        placeholder="Password"
        required
      ></input>

      <input type="submit" class="Auth-Input Button" value="Log in"></input>

      <div class="Auth-Extra">
        <p>
          Forgotten your password?{' '}
          <a class="Auth-Link" href="reset">
            Click To Reset
          </a>
        </p>
        <p>
          Don&apos;t have an account yet?{' '}
          <a class="Auth-Link" href="register">
            Register
          </a>
        </p>
      </div>
    </form>
  );
}
