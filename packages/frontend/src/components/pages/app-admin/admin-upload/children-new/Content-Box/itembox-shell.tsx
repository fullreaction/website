import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'itembox-shell',
  styleUrl: 'itembox-shell.css',
})
export class UploadItemShell {
  render = () => (
    <Host class="Upload-File-Box">
      <slot />
    </Host>
  );
}
