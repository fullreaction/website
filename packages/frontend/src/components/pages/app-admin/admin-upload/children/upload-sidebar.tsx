import { Component, h, Host, Event, EventEmitter, Prop } from '@stencil/core';

import { FileSystemService, RecursiveSkeleton } from '../../../../../services/file-system-services';
import { FSparams } from '../admin-upload';

/*
  * moving files and folders
    {
      * SQL trigger for changing folder parents
      * making folders highlightable
      * making both folders and files tabbable
      * dragging
      * dropping on folder puts it in folder
    }



  * right click



  * Uploading folders (scrapped)
*/

@Component({
  tag: 'upload-sidebar',
  styleUrl: '../admin-upload.css',
})
export class AdminUpload {
  @Event({
    eventName: 'overlayRequest',
  })
  overlayRequest: EventEmitter<FSparams>;
  overlayRequestHandler() {
    this.overlayRequest.emit(this.fsData);
  }
  @Event({
    eventName: 'refreshRequest',
  })
  refreshRequest: EventEmitter<RecursiveSkeleton | number>;

  globalRefresh(skel: RecursiveSkeleton | number) {
    this.refreshRequest.emit(skel);
  }
  localRefresh() {
    this.forceRender = !this.forceRender;
  }
  @Prop()
  forceRender = false;

  private file: File;
  private fsData: FSparams;

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      if (this.forceRender != null) this.fsData = { id: FileSystemService.skeleton.dir_id, func: 'none' };
    });
  }

  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, FileSystemService.dirInfo.currentDir).then(() => {
        this.globalRefresh(FileSystemService.dirInfo.currentDir);
        e.target.value = null;
      });
    }
  }

  drawSkeleton(skel: RecursiveSkeleton) {
    if (skel.children != null) {
      return skel.children.map((child, index) => {
        let count = 0;
        for (let i = 0; i < index; i++) {
          if (FileSystemService.dirInfo.directories[i].dir_name === child.dir_name) count++;
        }
        return (
          <div class="Upload-CollectionWrapper">
            <button
              class="Upload-Collection"
              onClick={() => {
                FileSystemService.getChildren(child.dir_id).then(() => {
                  this.globalRefresh(child);
                });
              }}
            >
              <div
                class="Upload-ArrowWrapper"
                onClick={e => {
                  // Take outside
                  e.stopPropagation();

                  if (child.children == null)
                    FileSystemService.getSkeleton(child).then(() => {
                      child.showSubfolders = true;
                      this.localRefresh();
                    });
                  else {
                    child.showSubfolders = !child.showSubfolders;
                  }
                  this.localRefresh();
                }}
              >
                <div class={{ 'Upload-Arrow': true, 'Upload-ArrowDown': child.showSubfolders }}></div>
              </div>
              <span class="Upload-CollectionName">
                {count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}
              </span>
              <button class="Upload-Dots">
                <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
                <div class="Upload-Dots-Wrapper">
                  <div class="Upload-Dots-Content">
                    <button
                      class="Content-Item"
                      onClick={e => {
                        // Take outside
                        e.stopPropagation();
                        this.fsData = { id: child.dir_id, func: 'makeDir' };
                        this.overlayRequestHandler();
                      }}
                    >
                      <span>Add Collection</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.downloadDir(child.dir_id, child.dir_name);
                      }}
                    >
                      <span>Download Collection</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        this.fsData = { id: child.dir_id, func: 'changeDirName' };
                        this.overlayRequestHandler();
                      }}
                    >
                      <span>Rename Collection</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.removeDirectory(child.dir_id).then(() => {
                          this.globalRefresh(child.dir_id);
                        });
                      }}
                    >
                      <span>Delete Collection</span>
                    </button>
                  </div>
                </div>
              </button>
            </button>

            <div class="Upload-Subcollection">{child.showSubfolders == true ? this.drawSkeleton(child) : ''}</div>
          </div>
        );
      });
    }
  }

  render = () => (
    <Host class="Upload-Side">
      <label class="Upload-Media-Button">
        <input type="file" onChange={e => this.onFileChange(e)} />
        Upload Media
      </label>
      <div
        class="Upload-Collection Upload-CollectionHeader"
        onClick={() => {
          FileSystemService.getChildren(null).then(() => {
            this.globalRefresh(FileSystemService.skeleton);
          });
        }}
      >
        <span>COLLECTIONS</span>
        <button class="Upload-Dots">
          <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
          <div class="Upload-Dots-Wrapper">
            <div class="Upload-Dots-Content">
              <button
                class="Content-Item"
                onClick={e => {
                  e.stopPropagation();
                  this.fsData = { id: FileSystemService.skeleton.dir_id, func: 'makeDir' };
                  this.overlayRequestHandler();
                }}
              >
                <span>Add Collection</span>
              </button>
            </div>
          </div>
        </button>
      </div>

      {this.drawSkeleton(FileSystemService.skeleton)}
    </Host>
  );
}
