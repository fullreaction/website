import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render = () => (
    <Host class="Root">
      <app-section elevate background noMargin>
        <app-header />
      </app-section>
      <stencil-router class="Separator">
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" component="app-home" exact={true} />
          <stencil-route url="/docs" component="app-docs" />
          <stencil-route url="/auth" component="app-auth" />
          <stencil-route url="/test/form" component="app-form" />
          <stencil-route url="/admin/panel" component="admin-table" />
          <stencil-route url="/admin/upload" component="admin-upload" />
        </stencil-route-switch>
      </stencil-router>
      <app-section elevate background>
        <app-footer />
      </app-section>
    </Host>
  );
}
