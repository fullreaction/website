import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <app-hero></app-hero>
        <stencil-route-link url="/docs">
          <button>Documentation</button>
        </stencil-route-link>
      </div>
    );
  }
}
