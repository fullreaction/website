import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <app-section background={true}>
          <app-hero />
        </app-section>
        <app-section>
          <app-integration />
        </app-section>
        <app-section background={true}>
          <app-features />
        </app-section>
        <app-section>
          <app-support />
        </app-section>
      </div>
    );
  }
}
