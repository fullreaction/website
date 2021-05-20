import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <div class="header">
        <div class="title">
          <img class="logo" src="assets\icon\logo-icon.png" />
          FullReaction
        </div>
        <a class="featuresbtn" href="">
          Features
        </a>
        <a class="docsbtn" href="">
          Documentation
        </a>
        <a class="github-button" href="https://github.com/ntkme/github-buttons" data-icon="octicon-star" data-size="large" aria-label="Star ntkme/github-buttons on GitHub">
          Star
        </a>
      </div>
    );
  }
}
