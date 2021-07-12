import { Component, h, Host, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'app-hero',
  styleUrl: 'app-hero.css',
})
export class AppFooter {
  @State() email: string;

  @State() isResponse: boolean | null = null;

  async submit() {
    try {
      await axios.post('/mailing/signup', { email: this.email });
      this.isResponse = true;
    } catch (error) {
      this.isResponse = false;
    }
  }

  render() {
    return (
      <Host class="Hero">
        <h1 class="Hero-Header Heading-1">
          Publish to any <i>Platform</i> with ease
        </h1>
        <p class="Hero-Subheader Text-1">
          One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more
        </p>
        {this.isResponse === null && this.renderForm()}
        {this.isResponse === true && <span class="Footer-Response Text-1">A confirmation email has been sent.</span>}
        {this.isResponse === false && <span class="Footer-Error Text-1">An error has occurred.</span>}
      </Host>
    );
  }

  renderForm() {
    return (
      <form
        name="signup form"
        class="Hero-Form"
        onSubmit={e => {
          e.preventDefault();
          this.submit();
        }}
      >
        <input
          type="email"
          value={this.email}
          onChange={e => {
            this.email = (e.target as HTMLInputElement).value;
          }}
          placeholder="Email"
          name="signup email"
          class="Hero-FormEmail InputText"
          required
        />
        <input type="submit" class="Hero-FormSubmit Button" value="Sign up for beta" />
      </form>
    );
  }
}
