import { Component, h, Host, State } from '@stencil/core';
import { FileSystem } from '../../../../services/file-system-services';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() toggleVis = false;
  @State() overlayVis = false;

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
                this.overlayVis = !this.overlayVis;
                this.toggleVis = !this.toggleVis;
                console.log(this.overlayVis);
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
      <div class={{ 'Add-Overlay': true, 'Overlay-Vis': this.overlayVis }}>
        <div class="Add-Overlay-Content">
          <div class="Add-Overlay-Text"> Name your Collection</div>
          <input class="Add-Overlay-Input"></input>
          <div class="Add-Overlay-Buttons">
            <button
              class="Add-Overlay-Button Button-Confirm"
              onClick={() => {
                FileSystem.AddDirectory('test');
                this.overlayVis = !this.overlayVis;
              }}
            >
              Confirm
            </button>
            <button
              class="Add-Overlay-Button Button-Cancel"
              onClick={() => {
                this.overlayVis = !this.overlayVis;
                console.log(this.overlayVis);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Host>
  );
}
