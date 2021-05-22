import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-features',
  styleUrl: 'app-features.css',
  shadow: true,
})
export class AppFeatures {
  render() {
    return (
      <div class="Features-Box">
        <h2 class="Features-Header">Features</h2>
        <div class="Features-Textboxes">
          <div class="Features-Textbox">
            {' '}
            <p>
              One API to publish your content to <br></br>Facebook, Linedin, Instagram,<br></br> Youtube and more One API to publish<br></br> your content to Facebook, Linedin
              <br></br> Instagram, Youtube and more
            </p>
          </div>
          <div class="Features-Textbox">
            {' '}
            <p>
              One API to publish your content to <br></br>Facebook, Linedin, Instagram,<br></br> Youtube and more One API to publish<br></br> your content to Facebook, Linedin
              <br></br> Instagram, Youtube and more
            </p>
          </div>
          <div class="Features-Textbox">
            {' '}
            <p>
              One API to publish your content to <br></br>Facebook, Linedin, Instagram,<br></br> Youtube and more One API to publish<br></br> your content to Facebook, Linedin
              <br></br> Instagram, Youtube and more
            </p>
          </div>
        </div>
      </div>
    );
  }
}
