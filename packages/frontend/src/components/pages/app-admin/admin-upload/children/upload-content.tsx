import { Component, h, Host, State, Event, EventEmitter, Prop } from '@stencil/core';
import { FileEntry } from '../../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../../services/file-system-services';

/*
  moving files and folders
  right click

  Uploading folders (scrapped)
*/

@Component({
  tag: 'upload-content',
  styleUrl: '../admin-upload.css',
})
export class AdminUpload {
  @State() fileArray: FileEntry[] = [];

  @Event({
    eventName: 'cancelMedia',
  })
  cancelMedia: EventEmitter;
  @Event({
    eventName: 'selectMedia',
  })
  selectMedia: EventEmitter<FileEntry[]>;
  @Event({
    eventName: 'overlayRequest',
  })
  overlayRequest: EventEmitter;
  @Event({
    eventName: 'refreshRequest',
  })
  refreshRequest: EventEmitter;
  @Event({
    eventName: 'updateRequest',
  })
  updateRequest: EventEmitter<RecursiveSkeleton | number>;
  @Event({
    eventName: 'previewRequest',
  })
  previewRequest: EventEmitter<FileEntry>;
  cancelMediaHandler() {
    this.cancelMedia.emit();
  }

  selectMediaHandler() {
    this.selectMedia.emit(this.fileArray);
  }
  overlayRequestHandler() {
    this.overlayRequest.emit(this.fsData);
  }
  previewRequestHandler(file: FileEntry) {
    this.previewRequest.emit(file);
  }

  globalRefresh(skel: RecursiveSkeleton | number) {
    this.updateRequest.emit(skel);
  }
  localRefresh() {
    this.refreshRequest.emit();
  }
  @Prop()
  forceRender = false;
  private file: File;

  private fsData: { id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };
  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, FileSystemService.dirInfo.currentDir.dir_id).then(() => {
        this.globalRefresh(FileSystemService.dirInfo.currentDir.dir_id);
        e.target.value = null;
      });
    }
  }
  drawChildren(skel: RecursiveSkeleton) {
    if (skel.files != null) {
      return skel.files.map((child, index) => {
        let count = 0;
        for (let i = 0; i < index; i++) {
          if (skel.files[i].file_name === child.file_name) count++;
        }
        return (
          <div class="Upload-CollectionWrapper">
            <button
              class="Upload-Collection"
              onClick={() => {
                //
              }}
              onDragStart={() => {
                FileSystemService.draggedFileId = child.file_id;
                this.localRefresh();
              }}
              draggable
            >
              <img class="Upload-CollectionIcon" src={FileSystemService.getIcon(child.file_type)}></img>

              <span class="Upload-CollectionName">
                {count === 0 ? child.file_name : child.file_name + ' (' + count + ')'}
              </span>
              <button class="Upload-Dots">
                <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
                <div class="Upload-Dots-Wrapper">
                  <div class="Upload-Dots-Content">
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.downloadFile(child);
                      }}
                    >
                      <span>Download File</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        this.fsData = { id: child.file_id, func: 'changeFileName' };
                        this.overlayRequestHandler();
                      }}
                    >
                      <span>Rename File</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.deleteFile(child.file_id).then(() => {
                          this.globalRefresh(FileSystemService.dirInfo.currentDir.dir_id);
                        });
                      }}
                    >
                      <span>Delete File</span>
                    </button>
                  </div>
                </div>
              </button>
            </button>
          </div>
        );
      });
    }
  }

  render = () => (
    <Host class="Upload-Content">
      <div class="Upload-Side">
        <label class="Upload-Media-Button">
          <input type="file" onChange={e => this.onFileChange(e)} />
          Upload Media
        </label>
        <div
          class="Upload-Collection Upload-CollectionHeader"
          onClick={() => {
            this.globalRefresh(FileSystemService.skeleton);
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
        <comp-tree
          tree={FileSystemService.skeleton}
          detailFactory={(child: RecursiveSkeleton) => {
            return (
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
            );
          }}
        ></comp-tree>
        {this.drawChildren(FileSystemService.skeleton)}
      </div>
      <div class="Upload-Path">
        {' '}
        <span
          class="Upload-PathElement"
          onClick={() => {
            this.globalRefresh(FileSystemService.skeleton);
          }}
        >
          COLLECTIONS
        </span>
        {FileSystemService.path.map(elem => (
          <span class="Upload-PathArrow">
            {' > '}
            <span
              class="Upload-PathElement"
              onClick={() => {
                this.globalRefresh(elem.dir_id);
              }}
            >
              {elem.dir_name}
            </span>
          </span>
        ))}
      </div>

      <div class="Upload-Button-Box">
        <button
          class="Upload-Button-1"
          onClick={() => {
            this.cancelMediaHandler();
          }}
        >
          Cancel
        </button>
        <button
          class="Upload-Button-2 Button"
          onClick={() => {
            this.selectMediaHandler();
          }}
        >
          {' '}
          Select Media
        </button>
      </div>
    </Host>
  );
}
