import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'app-section',
  styleUrl: 'app-section.css',
})
export class AppSection {
  @Prop({ reflect: true }) background = false;
  @Prop({ reflect: true, attribute: 'no-margin' }) noMargin = false;
  @Prop({ reflect: true }) elevate = false;
  render() {
    return (
      <Host class="Section">
        <section class="Section-Wrap">
          <slot />
        </section>
      </Host>
    );
  }
}
