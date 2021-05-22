import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <div id="mc_embed_signup">
          <form
            action="https://fullreaction.us6.list-manage.com/subscribe/post?u=0b5c41c578481015f17e2897c&amp;id=860d544374"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required />

              <div aria-hidden="true" hidden>
                <input type="text" name="b_0b5c41c578481015f17e2897c_860d544374" tabindex="-1" value="" />
              </div>
              <div class="clear">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" />
              </div>
            </div>
          </form>
        </div>
        <app-features></app-features>
        <app-support></app-support>
      </div>
    );
  }
}
