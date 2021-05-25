import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <div class="Header">
        <a class="Header-Title" href="http://localhost:3333/">
          <img class="Header-Logo" src="assets\icon\logo.svg" />
        </a>
        <a class="Features-Button" href="">
          Features
        </a>
        <a class="Docs-Button" href="http://localhost:3333/docs">
          Documentation
        </a>
        <iframe
          class="Github-Button"
          src="https://ghbtns.com/github-btn.html?user=fullreaction&repo=fullreaction&type=watch&count=false"
          frameborder="0"
          scrolling="0"
          title="GitHub"
        ></iframe>
      </div>
    );
  }
}
