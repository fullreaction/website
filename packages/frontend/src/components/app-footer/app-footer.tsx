import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
})
export class AppFooter {
  @State() email: string;
  @State() message: string; //I'm not sure I should be saving in string

  async submit(e) {
    e.preventDefault();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({ email: this.email, message: this.message }),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:3000/mailing/contact', fetchData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return false;
  }

  render() {
    return (
      <Host class="Footer-Host">
        <form class="Footer-ContactForm" onSubmit={e => this.submit(e)}>
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
            value={this.message}
            onInput={e => (this.message = (e.target as HTMLTextAreaElement).value)}
            class="Footer-FormBody"
            name="contact-body"
            placeholder="Message"
            required
          />
          <input type="submit" class="Footer-FormSubmit" value="Submit" />
        </form>
        <div class="Footer-LogoWrapper">
          <img class="Footer-LogoIcon" src="../../assets/icon/logo-icon.png" />
          <h2 class="Footer-LogoText">FullReaction</h2>
        </div>
      </Host>
    );
  }
}
