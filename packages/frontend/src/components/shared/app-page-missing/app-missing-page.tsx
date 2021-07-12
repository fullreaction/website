import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-missing-page',
})
export class AppMissingPage {
  render() {
    return <h2 style={{ textAlign: 'center' }}>404: Page Missing</h2>;
  }
}
