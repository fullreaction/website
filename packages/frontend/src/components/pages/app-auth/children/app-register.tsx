import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { gvmHttpErrorResponse } from '../../../../utils/httpUtils';
import authStore from '../authStore';

@Component({
  tag: 'app-register',
  styleUrl: '../app-auth.css',
})
export class AppRegister {
  @State() email: string;
  @State() password: string;
  @State() confPassword: string;
  register(e) {
    e.preventDefault();
    //Validation required
    if (this.password == this.confPassword)
      AuthService.register(this.email, this.password)
        .then(() => {
          // navigate to main page?
        })
        .catch((e: gvmHttpErrorResponse) => {
          authStore.isError = true;
          authStore.errorText = e.message;
        });
  }
  render = () => (
    <div>
      <form class="Auth-Form" onSubmit={e => this.register(e)}>
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
        <input
          type="password"
          class="Auth-Input InputText"
          value={this.confPassword}
          onInput={e => (this.confPassword = (e.target as HTMLInputElement).value)}
          placeholder="Confirm Password"
          required
        ></input>
        <input type="submit" class="Auth-Input Button" value="Register"></input>
      </form>
      <a class="Auth-Input  Button Auth-Inverted" href="login">
        Go back
      </a>
    </div>
  );
}
