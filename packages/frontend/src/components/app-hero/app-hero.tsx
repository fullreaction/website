import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-hero',
  styleUrl: 'app-hero.css',
})
export class AppFooter {
  @State() email: string;

  async submit(e) {
    e.preventDefault();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({ email: this.email }),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:3000/mailing/signup', fetchData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return false;
  }
  //Signup doesn't work.
  render() {
    return (
      <Host class="Hero-Host">
        <h1 class="Hero-Header">
          Publish to any form <br /> with ease
        </h1>
        <span class="Hero-Subheader">
          One API to publish your content to <br /> Facebook, Linkedin, Instagram, Youtube and more
        </span>

        <div id="mc_embed_signup">
          <form
            action="https://fullreaction.us6.list-manage.com/subscribe/post?u=0b5c41c578481015f17e2897c&amp;id=860d544374"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate Hero-Form"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <input type="email" value="" placeholder="Email" name="EMAIL" class="Hero-FormEmail" id="mce-EMAIL" required />
              <label htmlFor="mce-EMAIL" class="Hero-FormSubmit">
                Sign up for beta
              </label>
            </div>
          </form>
        </div>
      </Host>
    );
  }
}
