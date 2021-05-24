import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <div class="header">
        <a class="title" href="http://localhost:3333/">
          <img class="logo" src="assets\icon\logo-icon.png" />
          FullReaction
        </a>
        <a class="featuresbtn" href="">
          Features
        </a>
        <a class="docsbtn" href="http://localhost:3333/docs">
          Documentation
        </a>
        <iframe
          class="github-button"
          src="https://ghbtns.com/github-btn.html?user=fullreaction&repo=fullreaction&type=watch&count=false&size=large"
          frameborder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      </div>
    );
  }
}
