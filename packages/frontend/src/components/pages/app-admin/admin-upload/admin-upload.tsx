import { Component, h, Host, State } from '@stencil/core';
import { Directory, FileEntry } from '../../../../models/upload.models';
import { AuthService } from '../../../../services/auth-service';
import { FileSystemService } from '../../../../services/file-system-services';

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
        {FileSystemService.skeleton.children.map(val => (
          <button class="Upload-Collection">
            {val.dir_name}
            <img class="Upload-EditDots" src="\assets\icon\3Dots-icon.svg" />
          </button>
        ))}
      </div>

      <div class="Upload-Content">
        <input class="Upload-Searchbar" type="text" placeholder="Search" />
        <div class="Upload-Categories"> COLLECTIONS &#62;&nbsp;</div>
        <div class="Upload-File-Box">
          {FileSystemService.dirChildren.directories.map(val => (
            <div class="Upload-Item">
              <img class="Upload-Outer-Image" src="\assets\icon\blank-image.svg">
                <img class="Upload-inner-Image" src="\assets\icon\3Dots-icon.svg"></img>
              </img>
              <span class="Upload-Image-Text">{val.dir_name}</span>
            </div>
          ))}
          {FileSystemService.dirChildren.files.map(val => (
            <div class="Upload-Item">
              <img class="Upload-Outer-Image" src="\assets\icon\blank-image.svg">
                <img class="Upload-inner-Image" src="\assets\icon\3Dots-icon.svg"></img>
              </img>
              <span class="Upload-Image-Text">{val.file_name}</span>
            </div>
          ))}
        </div>
        <div class="Upload-Button-Box">
          <button class="Upload-Button-1">Cancel</button>
          <button class="Upload-Button-2 Button"> Select Media</button>
        </div>
      </div>
    </Host>
  );
}
