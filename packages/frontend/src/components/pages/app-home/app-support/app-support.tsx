import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-support',
  styleUrl: 'app-support.css',
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
        <div class="Button-Box-Support">
          <stencil-route-link url="/docs">
            <button class="Support-Buttons">Documentation</button>
          </stencil-route-link>
          <button class="Support-Buttons">
            <img src="../../../../assets/icon/Github.svg" class="Support-Icons"></img>Github
          </button>
          <button class="Support-Buttons">
            <img src="../../../../assets/icon/Discord.svg" class="Support-Icons"></img>Discord
          </button>
        </div>
      </div>
    );
  }
}
