import { Component, h, Host, State } from '@stencil/core';
import { FileSystem } from '../../../../services/file-system-services';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() toggleVis = true;

  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <button class="Upload-Media-Button">Upload Media</button>
        <div class="Upload-Collections">
          COLLECTIONS
          <button
            onClick={() => {
              this.toggleVis = !this.toggleVis;
              console.log(this.toggleVis);
            }}
            class="Upload-Dots"
          >
            <img src="\assets\icon\3Dots-icon.svg" />
          </button>
          <div class={{ 'Upload-Dots-Content': true, 'Toggle-Vis': this.toggleVis }}>
            <button
              class="Add-Collection"
              onClick={() => {
                FileSystem.AddDirectory('test');
              }}
            >
              Add Collection
            </button>
          </div>
        </div>
        <button class="Upload-Collection">
          Images
          <div class="Upload-EditDots">
            <img src="\assets\icon\3Dots-icon.svg" />
          </div>
        </button>
      </div>
    </Host>
  );
}
