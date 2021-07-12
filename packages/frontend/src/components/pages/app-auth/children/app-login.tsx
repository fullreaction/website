import { Component, h, Prop, State } from '@stencil/core';
import { AuthEndpoints } from '../../../../services/auth-endpoints';
import { RouterHistory } from '@stencil/router';
import { store } from '../../../../services/store';

@Component({
  tag: 'app-login',
})
export class AppLogin {
  @State() email: string;
  @State() password: string;

  @Prop() history: RouterHistory;

  async login() {
    try {
      store.state.user = await AuthEndpoints.login(this.email, this.password);
      this.history.push('/admin');
    } catch (e) {
      console.log(e);
    }
  }

  render = () => (
    <host class="Form">
      <h2 class="Heading-2">Log in to your account</h2>
      <form
        class="Form"
        onSubmit={e => {
          e.preventDefault();
          this.login();
        }}
      >
        <input
          type="email"
          class="InputText"
          value={this.email}
          onInput={e => (this.email = (e.target as HTMLInputElement).value)}
          placeholder="Email address"
          required
        />
        <input
          type="password"
          class="InputText"
          value={this.password}
          onInput={e => (this.password = (e.target as HTMLInputElement).value)}
          placeholder="Password"
          required
        />

        <input type="submit" class="Button" value="Log in" />

        <div>
          <p>
            Forgotten your password?{' '}
            <a class="Auth-Link" href="/auth/reset">
              Click To Reset
            </a>
          </p>
          <p>
            Don&apos;t have an account yet?{' '}
            <a class="Auth-Link" href="/auth/register">
              Register
            </a>
          </p>
        </div>
      </form>
    </host>
  );
}
