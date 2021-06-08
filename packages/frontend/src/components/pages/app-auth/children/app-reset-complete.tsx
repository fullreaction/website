import { Component, h, Host, State } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { gvmHttpErrorResponse } from '../../../../utils/httpUtils';
import authStore from '../authStore';

@Component({
  tag: 'app-reset-complete',
  styleUrl: '../app-auth.css',
})
export class AppResetComplete {
  private email: string;
  @State() password: string;
  @State() confPassword: string;
  reset(e) {
    e.preventDefault();
    //Validation required
    const urlParams = new URLSearchParams(window.location.search);
    this.email = urlParams.get('email');
    if (this.password == this.confPassword)
      AuthService.reset(this.email, this.password)
        .then(() => {
          //
        })
        .catch((e: gvmHttpErrorResponse) => {
          authStore.isError = true;
          authStore.errorText = e.message;
        });
  }
  render = () => (
    <Host class="Auth-Child">
      <form class="Auth-Form" onSubmit={e => this.reset(e)}>
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

        <input type="submit" class="Auth-Input Button" value="Reset"></input>
      </form>
    </Host>
  );
}
