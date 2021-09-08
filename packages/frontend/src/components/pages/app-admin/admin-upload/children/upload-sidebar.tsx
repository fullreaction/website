import { Component, h, Host, Event, EventEmitter, State } from '@stencil/core';

import { FileSystemService, RecursiveSkeleton } from '../../../../../services/file-system-services';

/*
  moving files and folders
  right click

  put filesystemservice.skeleton inside @state var -> onrefresh refresh @state var

  Uploading folders (scrapped)
*/

@Component({
  tag: 'upload-sidebar',
  styleUrl: '../admin-upload.css',
})
export class AdminUpload {
  @Event({
    eventName: 'refresh',
  })
  refresh: EventEmitter;
  refreshHandler() {
    this.refresh.emit();
  }
  @Event({
    eventName: 'overlayRequest',
  })
  overlayRequest: EventEmitter;
  overlayRequestHandler() {
    this.overlayRequest.emit(this.fsData);
  }

  @State() skeleton: RecursiveSkeleton;

  private file: File;
  private fsData: { id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.fsData = { id: FileSystemService.skeleton.dir_id, func: 'none' };
      this.skeleton = FileSystemService.skeleton;
    });
  }

  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, FileSystemService.currentDir)
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.currentDir);
        })
        .then(() => {
          this.skeleton = { ...this.skeleton };
        });
    }
  }

  drawSkeleton(skel: RecursiveSkeleton) {
    if (skel.children != null) {
      return skel.children.map((child, index) => {
        let count = 0;
        for (let i = 0; i < index; i++) {
          if (FileSystemService.dirChildren.directories[i].dir_name === child.dir_name) count++;
        }
        return (
          <div class="Upload-CollectionWrapper">
            <button
              class="Upload-Collection"
              onClick={() => {
                FileSystemService.getChildren(child.dir_id).then(() => {
                  this.skeleton = { ...this.skeleton };
                });
              }}
            >
              <div
                class="Upload-ArrowWrapper"
                onClick={e => {
                  e.stopPropagation();

                  if (child.children == null)
                    FileSystemService.getSkeleton(child).then(() => {
                      child.showSubfolders = true;
                    });
                  else {
                    child.showSubfolders = !child.showSubfolders;
                    this.skeleton = { ...this.skeleton };
                    console.log(child);
                  }
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
                        FileSystemService.removeDirectory(child.dir_id)
                          .then(() => {
                            return FileSystemService.findSkeleton(child.dir_id);
                          })
                          .then(skeleton => {
                            return FileSystemService.getSkeleton(skeleton);
                          })
                          .then(() => {
                            this.skeleton = FileSystemService.skeleton;
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
            this.skeleton = { ...this.skeleton };
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

      {this.drawSkeleton(this.skeleton)}
    </Host>
  );
}
