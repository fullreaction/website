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
          <img src="logo-icon.png" />
          Fullreaction
        </div>
      </div>
    );
  }
}
