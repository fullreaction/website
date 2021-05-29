import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
})
export class AppHome {
  render = () => (
    <Host>
      <app-section background>
        <app-hero />
      </app-section>
      <app-section>
        <app-integration />
      </app-section>
      <app-section background>
        <app-features />
      </app-section>
      <app-section>
        <app-support />
      </app-section>
    </Host>
  );
}
