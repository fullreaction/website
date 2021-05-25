import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <app-header></app-header>
        </header>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/docs" component="app-docs" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <footer>
          <app-footer></app-footer>
        </footer>
      </div>
    );
  }
}
