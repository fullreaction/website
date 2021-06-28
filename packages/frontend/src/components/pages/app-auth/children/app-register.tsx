import { Component, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { gvmHttpErrorResponse } from '../../../../utils/httpUtils';
import authStore from '../authStore';
import { User } from '../../../../models/user.model';
import { UserValidator } from '../../../../utils/userValidation';

@Component({
  tag: 'app-register',
  styleUrl: '../app-auth.css',
})
export class AppRegister {
  @State() email: string;
  @State() password: string;
  @State() confPassword: string;

  @Prop() horizontal = false;

  @Event() register: EventEmitter;

  registerHandler(e) {
    e.preventDefault();
    if (this.password == this.confPassword) {
      const user: User = { user_email: this.email, user_pass: this.password, errors: new Map() };
      UserValidator.validateUser(user);
      if (user.errors.size == 0)
        AuthService.register(this.email, this.password)
          .then(() => {
            // navigate to main page?
          })
          .catch((e: gvmHttpErrorResponse) => {
            authStore.isError = true;
            authStore.errorText = e.message;
          });
      this.email = '';
      this.password = '';
      this.confPassword = '';
      this.register.emit();
    }
  }

  render = () => (
    <Host>
      <form class={{ 'Auth-Form': true, 'Auth-Horizontal': this.horizontal }} onSubmit={e => this.registerHandler(e)}>
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
        <a class={{ 'Auth-Input': true, 'Button': true, 'Auth-Inverted': true, 'Hidden': document.referrer == document.URL || document.referrer == '' }} href={document.referrer}>
          Go back
        </a>
      </form>
    </Host>
  );
}
