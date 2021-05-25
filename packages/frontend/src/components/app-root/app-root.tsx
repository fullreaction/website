import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <div>
        <app-section background={true}>
          <app-header />
        </app-section>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/docs" component="app-docs" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <app-section background={true}>
          <app-footer />
        </app-section>
      </div>
    );
  }
}
