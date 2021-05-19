import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-docs',
  styleUrl: 'app-docs.css',
  shadow: true,
})
export class AppDocs {
  render() {
    return (
      <div class="app-docs">
        <p>documentation</p>
      </div>
    );
  }
}
