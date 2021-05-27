import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
})
export class AppFooter {
  @State() email: string;
  @State() text: string;
  @State() submitResponse: string;

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
      })
      .catch(err => {
        console.log(err);
        this.submitResponse = 'An error has occured.';
      });
    return false;
  }

  render() {
    return (
      <Host class="Footer-Host">
        <form class={{ 'Footer-ContactForm': true, 'Hidden': this.submitResponse != undefined }} onSubmit={e => this.submit(e)}>
          <h2 class="Footer-FormHeader">Contact Us</h2>
          <input
            value={this.email}
            onInput={e => (this.email = (e.target as HTMLInputElement).value)}
            type="email"
            class="Footer-FormEmail"
            name="contact-email"
            placeholder="Email"
            required
          />
          <textarea
            value={this.text}
            onInput={e => (this.text = (e.target as HTMLTextAreaElement).value)}
            class="Footer-FormBody"
            name="contact-body"
            placeholder="Message"
            required
          />
          <input type="submit" class="Footer-FormSubmit" value="Send" />
        </form>
        <span class={{ 'Footer-Response': true, 'Hidden': this.submitResponse == undefined }}>{this.submitResponse}</span>
        <div class="Footer-LogoWrapper">
          <img class="Footer-Logo" src="../../../assets/icon/logo.svg" />
        </div>
      </Host>
    );
  }
}
