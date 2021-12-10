import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'dropdown-shell',
  styleUrl: 'dropdown-shell.css',
})
export class DropDownShell {
  render = () => (
    <Host class="Upload-Dots-Wrapper">
      <div class="Upload-Dots-Content">
        <slot></slot>
      </div>
    </Host>
  );
}
