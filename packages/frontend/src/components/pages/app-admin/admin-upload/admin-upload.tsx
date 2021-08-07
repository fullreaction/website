import { Component, h, Host, State } from '@stencil/core';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';
import { catchClickOut } from '../../../../utils/catchClickOut';

/*
  Get items alphabetically
  Directories can't have duplicate names, they merge
*/

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() toggleVis = false;
  @State() overlayVis = false;
  @State() forceRender = false;

  @State() newDir: { name: string; parent: RecursiveSkeleton };

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.newDir = { name: '', parent: FileSystemService.skeleton };
    });
  }

  makeDir(e) {
    console.log(this.newDir);
    e.preventDefault();
    FileSystemService.makeDir(this.newDir.name, this.newDir.parent.dir_id)
      .then(() => {
        return FileSystemService.getSkeleton(this.newDir.parent);
      })
      .then(() => {
        return FileSystemService.getChildren(this.newDir.parent.dir_id);
      })
      .then(() => {
        this.newDir.name = '';
        this.newDir.parent = FileSystemService.skeleton;
        this.forceRender = !this.forceRender;
      });
  }

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
                  FileSystemService.getSkeleton(val).then(() => {
                    val.showSubfolders = true;

                    this.forceRender = !this.forceRender;
                  });
                else {
                  val.showSubfolders = !val.showSubfolders;
                  this.forceRender = !this.forceRender;
                }
              }}
            >
              <div class={{ 'Upload-Arrow': true, 'Upload-ArrowDown': val.showSubfolders }}></div>
            </div>
            <span class="Upload-CollectionName">{val.dir_name}</span>
            <button
              class="Upload-Dots"
              ref={el =>
                catchClickOut(el, out => {
                  if (out == true) val.showSettings = false;
                  this.forceRender = !this.forceRender;
                })
              } //Might be too heavy
              onClick={e => {
                e.stopPropagation();
                val.showSettings = !val.showSettings;
                this.forceRender = !this.forceRender;
              }}
            >
              <img src="\assets\icon\3Dots-icon.svg" />
              <div class="Upload-Dots-Wrapper">
                <div class={{ 'Upload-Dots-Content': true, 'Toggle-Vis': val.showSettings }}>
                  <button
                    class="Content-Item"
                    onClick={e => {
                      e.stopPropagation();
                      this.newDir.parent = val;
                      this.overlayVis = true;
                      val.showSettings = false;
                      console.log(this.overlayVis);
                    }}
                  >
                    <span>Add Collection</span>
                  </button>
                  <button
                    class="Content-Item"
                    onClick={e => {
                      e.stopPropagation();
                      FileSystemService.removeDirectory(val.dir_id).then(() => {
                        this.forceRender = !this.forceRender;
                      });
                      val.showSettings = false;
                    }}
                  >
                    <span>Delete Collection</span>
                  </button>
                </div>
              </div>
            </button>
          </button>
          <div class="Upload-Subcollection">{val.showSubfolders == true ? this.drawSkeleton(val) : ''}</div>
        </div>
      ));
    }
  }

  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <button class="Upload-Media-Button">Upload Media</button>
        <div
          class="Upload-Collection Upload-CollectionHeader"
          onClick={() => {
            FileSystemService.getChildren(null).then(() => {
              this.forceRender = !this.forceRender;
            });
          }}
        >
          <span>COLLECTIONS</span>
          <button
            class="Upload-Dots"
            ref={el =>
              catchClickOut(el, out => {
                if (out) this.toggleVis = false;
              })
            }
            onClick={e => {
              e.stopPropagation();
              this.toggleVis = !this.toggleVis;
              console.log(this.toggleVis);
            }}
          >
            <img src="\assets\icon\3Dots-icon.svg" />
            <div class="Upload-Dots-Wrapper">
              <div class={{ 'Upload-Dots-Content': true, 'Toggle-Vis': this.toggleVis }}>
                <button
                  class="Content-Item"
                  onClick={e => {
                    e.stopPropagation();
                    this.overlayVis = !this.overlayVis;
                    this.toggleVis = !this.toggleVis;
                    console.log(this.overlayVis);
                  }}
                >
                  <span>Add Collection</span>
                </button>
              </div>
            </div>
          </button>
        </div>

        {this.forceRender != null ? this.drawSkeleton(FileSystemService.skeleton) : ''}
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
      <div class={{ 'Add-Overlay': true, 'Overlay-Vis': this.overlayVis }} onClick={() => (this.overlayVis = false)}>
        <form
          class="Add-Overlay-Content"
          onSubmit={e => {
            this.overlayVis = false;
            this.makeDir(e);
          }}
          onClick={e => e.stopPropagation()}
        >
          <div class="Add-Overlay-Text"> Name your Collection</div>

          <input
            class="Add-Overlay-Input"
            onInput={e => (this.newDir.name = (e.target as HTMLInputElement).value)}
            type="text"
            value={this.newDir.name}
            required
          ></input>
          <div class="Add-Overlay-Buttons">
            <input type="submit" class="Add-Overlay-Button Button-Confirm">
              Confirm
            </input>
            <button
              class="Add-Overlay-Button Button-Cancel"
              onClick={() => {
                this.overlayVis = !this.overlayVis;
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Host>
  );
}
