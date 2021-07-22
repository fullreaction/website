import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
})
export class AppFooter {
  @State() email: string;
  @State() text: string;
  @State() submitResponse: string;
  @State() isErrorResponse: boolean;

  submit(e) {
    e.preventDefault();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({ email: this.email, text: this.text }),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:3000/mailing/contact', fetchData)
      .then(res => {
        console.log(res);
        this.submitResponse = 'Thank you for contacting us.';
        this.isErrorResponse = false;
      })
      .catch(err => {
        console.log(err);
        this.submitResponse = 'An error has occured.';
        this.isErrorResponse = true;
      });
  }

  render() {
    return (
      <Host class="Footer">
        <form class="Footer-ContactForm" hidden={this.submitResponse != undefined} onSubmit={e => this.submit(e)}>
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
        <span class={this.isErrorResponse ? 'Footer-Error Text-1' : 'Footer-Response Text-1'}>
          {this.submitResponse}
        </span>

        <img class="Footer-Logo" src="/assets/icon/logo.svg" alt="Logo" />
      </Host>
    );
  }
}
