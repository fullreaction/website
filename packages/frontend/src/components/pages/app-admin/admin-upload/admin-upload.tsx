import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <div class="Button">Upload Media</div>
        <div class="Upload-Collections">COLLECTIONS</div>
        <div class="Upload-Collection">Cats</div>
        <div class="Upload-Collection">Dogs</div>
        <div class="Upload-Collection">Images</div>
      </div>
      <div class="Upload-Content">Content</div>
    </Host>
  );
}
