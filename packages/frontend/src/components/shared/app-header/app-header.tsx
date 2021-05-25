import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <Host class="Header">
        <a class="Header-Title" href="http://localhost:3333/">
          <img class="Header-Logo" src="assets\icon\logo-icon.png" />
          FullReaction
        </a>
        <a class="Features-Button" href="">
          Features
        </a>
        <a class="Docs-Button" href="http://localhost:3333/docs">
          Documentation
        </a>
        <div class="Header-Separator" />
        <iframe
          class="Github-Button"
          src="https://ghbtns.com/github-btn.html?user=fullreaction&repo=fullreaction&type=watch&count=false&size=large"
          frameborder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      </Host>
    );
  }
}
