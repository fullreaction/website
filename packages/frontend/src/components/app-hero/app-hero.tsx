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

        <form name="signup form" class="Hero-Form" onSubmit={e => this.submit(e)}>
          <input
            type="email"
            value={this.email}
            onChange={e => {
              this.email = (e.target as HTMLInputElement).value;
            }}
            placeholder="Email"
            name="signup email"
            class="Hero-FormEmail"
            id="mce-EMAIL"
            required
          ></input>

          <input type="submit" class="Hero-FormSubmit">
            Sign up for beta
          </input>
        </form>
      </Host>
    );
  }
}
