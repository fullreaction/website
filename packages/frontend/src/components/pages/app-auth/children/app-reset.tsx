import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-reset',
  styleUrl: '../app-auth.css',
})
export class AppReset {
  @State() email: string;
  @State() password: string;
  @State() confPassword: string;
  reset(e) {
    e.preventDefault();
    //Validation required
    if (this.password == this.confPassword) {
      // send email
    }
  }
  render = () => (
    <Host class="Auth-Child">
      <form class="Auth-Form" onSubmit={e => this.reset(e)}>
        <input
          type="email"
          class="Auth-Input InputText"
          value={this.email}
          onInput={e => (this.email = (e.target as HTMLInputElement).value)}
          placeholder="Email address"
          required
        ></input>

        <input type="submit" class="Auth-Input Button" value="Reset"></input>
      </form>
      <a class="Auth-Input Button Auth-Inverted" href="login">
        Go back
      </a>
    </Host>
  );
}
