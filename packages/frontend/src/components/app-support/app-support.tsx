import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-support',
  styleUrl: 'app-sup.css',
})
export class AppSupport {
  render() {
    return (
      <div class="Support-Box">
        <h2 class="Support-Header"> Support </h2>
        <div class="Support-Text">
          <p>
            One API to publish your content to <br></br> Facebook, Linkedin, Instagram, Youtube and more
          </p>
        </div>
        <div class="Support-Buttons">
          <stencil-route-link url="/docs">
            <button>Documentation</button>
          </stencil-route-link>
          <button>Github</button>
          <button>Discord</button>
        </div>
      </div>
    );
  }
}
