import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <Host class="Header">
        <a class="Header-Title" href="/">
          <img class="Header-Logo" src="/assets/icon/logo.svg" alt="Logo" />
        </a>
        <a class="Header-Button Text-1" href="/#features">
          Features
        </a>
        <a class="Header-Button Text-1" href="/docs">
          Documentation
        </a>
        <div class="Header-Separator" />
        <a
          class="Github-Button"
          href="https://github.com/fullreaction/fullreaction"
          title="Star fullreaction/fullreaction on GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <img width="16" height="16" src="/assets/social-icons/Github.svg" />
          Star
        </a>
      </Host>
    );
  }
}
