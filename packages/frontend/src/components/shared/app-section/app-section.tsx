import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'app-section',
  styleUrl: 'app-section.css',
})
export class AppSection {
  @Prop({ reflect: true }) background = false;
  render() {
    return (
      <Host class="Section">
        <div class="Section-Wrap">
          <slot />
        </div>
      </Host>
    );
  }
}
