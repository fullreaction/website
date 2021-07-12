import { Component, h, Host, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
})
export class AppFooter {
  @State() email: string;
  @State() text: string;

  @State() isResponse: boolean | null = null;

  async submit() {
    try {
      await axios.post('/mailing/contact', { email: this.email, text: this.text });
      this.isResponse = true;
    } catch (error) {
      this.isResponse = false;
    }
  }

  render() {
    return (
      <Host class="Footer">
        {this.isResponse === null && this.renderForm()}
        {this.isResponse === true && <span class="Footer-Response Text-1">Thank you for contacting us.</span>}
        {this.isResponse === false && <span class="Footer-Error Text-1">An error has occurred.</span>}
        <img class="Footer-Logo" src="/assets/icon/logo.svg" alt="Logo" />
      </Host>
    );
  }

  renderForm() {
    return (
      <form
        class="Footer-ContactForm"
        onSubmit={e => {
          e.preventDefault();
          this.submit();
        }}
      >
        <h2 class="Footer-FormHeader Heading-2">Contact Us</h2>
        <input
          value={this.email}
          onInput={e => (this.email = (e.target as HTMLInputElement).value)}
          type="email"
          class="Footer-FormEmail InputText"
          name="contact-email"
          placeholder="Email"
          required
        />
        <textarea
          value={this.text}
          onInput={e => (this.text = (e.target as HTMLTextAreaElement).value)}
          class="Footer-FormBody InputArea"
          name="contact-body"
          placeholder="Message"
          required
        />
        <input type="submit" class="Footer-FormSubmit Button" value="Send" />
      </form>
    );
  }
}
