import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-support',
  styleUrl: 'app-support.css',
})
export class AppSupport {
  render() {
    return (
      <Host>
        <h2 class="Support-Header Heading-2">Support</h2>
        <p class="Support-Text Text-1">One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more</p>
        <div class="Support-Wrap">
          <stencil-route-link url="/docs" class="Button Support-Link">
            Documentation
          </stencil-route-link>
          <a class="Button" href="https://github.com/fullreaction/fullreaction" target="_blank" rel="noreferrer">
            <img src="/assets/icon/Github.svg" class="Support-Icons" />
            Github
          </a>
          <a class="Button" href="https://discord.gg/4m8P54aezs" target="_blank" rel="noreferrer">
            <img src="/assets/icon/Discord.svg" class="Support-Icons" />
            Discord
          </a>
        </div>
      </Host>
    );
  }
}
