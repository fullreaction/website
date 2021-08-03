import { Component, h, Host, State } from '@stencil/core';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

/*
  Make a recursive function
    takes in RecursiveSkeleton, shows children, adding onclicks to them

  if RecursiveSkeleton.children==null,
  then filesystemservice.getchild(RecursiveSkeleton.dir_id)

*/

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() toggleVis = false;
  @State() overlayVis = false;
  @State() forceRender = false;
  @State() dirName: string;

  drawSkeleton(skel: RecursiveSkeleton) {
    if (skel.children != null) {
      return skel.children.map(val => (
        <div class="Upload-CollectionWrapper">
          <button
            class="Upload-Collection"
            onClick={() => {
              FileSystemService.getChildren(val.dir_id).then(() => {
                this.forceRender = !this.forceRender;
              });
            }}
          >
            <div
              class="Upload-ArrowWrapper"
              onClick={e => {
                e.stopPropagation();
                if (val.children == null)
                  FileSystemService.getSkeleton(val.dir_id, val).then(() => {
                    val.open = true;
                    this.forceRender = !this.forceRender;
                  });
                else {
                  val.open = !val.open;
                  this.forceRender = !this.forceRender;
                }
              }}
            >
              <div class={{ 'Upload-Arrow': true, 'Upload-ArrowDown': val.open }}></div>
            </div>
            <span>{val.dir_name}</span>
            <img class="Upload-EditDots" src="\assets\icon\3Dots-icon.svg" />
          </button>
          <div class="Upload-Subcollection">
            {val.open == true && this.forceRender != null ? this.drawSkeleton(val) : ''}
          </div>
        </div>
      ));
    }
  }
  async componentWillLoad() {
    return await FileSystemService.init();
  }
  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <button class="Upload-Media-Button">Upload Media</button>
        <div
          class="Upload-Collections"
          onClick={() => {
            FileSystemService.getChildren(null).then(() => {
              this.forceRender = !this.forceRender;
            });
          }}
        >
          COLLECTIONS
          <button
            onClick={e => {
              e.stopPropagation();
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
              onClick={e => {
                e.stopPropagation();
                this.overlayVis = !this.overlayVis;
                this.toggleVis = !this.toggleVis;
                console.log(this.overlayVis);
              }}
            >
              Add Collection
            </button>
          </div>
        </div>

        {this.drawSkeleton(FileSystemService.skeleton)}
      </div>

      <div class="Upload-Content">
        <input class="Upload-Searchbar" type="text" placeholder="Search" />
        <div class="Upload-Path"> COLLECTIONS &#62;&nbsp;</div>
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
      <div class={{ 'Add-Overlay': true, 'Overlay-Vis': this.overlayVis }}>
        <div class="Add-Overlay-Content">
          <div class="Add-Overlay-Text"> Name your Collection</div>
          <input class="Add-Overlay-Input" value={this.dirName}></input>
          <div class="Add-Overlay-Buttons">
            <button
              class="Add-Overlay-Button Button-Confirm"
              onClick={() => {
                FileSystemService.makeDir(this.dirName, null);
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
