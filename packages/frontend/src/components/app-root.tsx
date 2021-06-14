import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render = () => (
    <Host class="Root">
      <app-section background noMargin>
        <app-header />
      </app-section>
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" component="app-home" exact={true} />
          <stencil-route url="/docs" component="app-docs" />
          <stencil-route url="/auth" component="app-auth" />
          <stencil-route url="/test" component="admin-table" />
        </stencil-route-switch>
      </stencil-router>
      <app-section style={{ marginTop: 'auto' }} background>
        <app-footer />
      </app-section>
    </Host>
  );
}
