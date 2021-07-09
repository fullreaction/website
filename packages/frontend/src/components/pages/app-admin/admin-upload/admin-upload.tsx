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
      <div class="Upload-Content">
        <input class="Upload-Searchbar" type="text" placeholder="Search" />
        <div class="Upload-Drag-drop"></div>
        <div class="Upload-Button-Box">
          <button class="Upload-Buttons Upload-Button-1">Cancel</button>
          <button class="Upload-Buttons Upload-Button-2"> Select Media</button>
        </div>
      </div>
    </Host>
  );
}
