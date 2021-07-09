import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-features',
  styleUrl: 'app-features.css',
})
export class AppFeatures {
  render() {
    return (
      <Host class="Features" id="features">
        <h2 class="Features-Header Heading-2">Features</h2>
        <ul class="Features-List">
          <li class="Features-Textbox Text-1">
            One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more One API to publish your
            content to Facebook, Linkedin Instagram, Youtube and more
          </li>
          <li class="Features-Textbox Text-1">
            One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more One API to publish your
            content to Facebook, Linkedin Instagram, Youtube and more
          </li>
          <li class="Features-Textbox Text-1">
            One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more One API to publish your
            content to Facebook, Linkedin Instagram, Youtube and more
          </li>
        </ul>
      </Host>
    );
  }
}
