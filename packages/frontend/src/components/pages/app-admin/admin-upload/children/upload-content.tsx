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
  @State() searchWord = '';
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
  refreshRequest: EventEmitter<RecursiveSkeleton | number>;
  @Event({
    eventName: 'previewRequest',
  })
  previewRequest: EventEmitter<Blob>;
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
    FileSystemService.getFile(file).then(blob => {
      this.previewRequest.emit(blob);
    });
  }

  globalRefresh(skel: RecursiveSkeleton | number) {
    this.refreshRequest.emit(skel);
  }
  localRefresh() {
    this.forceRender = !this.forceRender;
  }
  @Prop()
  forceRender = false;

  private fsData: { id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };

  render = () => (
    <Host class="Upload-Content">
      <input
        class="Upload-Searchbar"
        type="text"
        placeholder="Search"
        value={this.searchWord}
        onInput={e => (this.searchWord = (e.target as HTMLInputElement).value)}
      />
      <div class="Upload-Path">
        {' '}
        <span
          class="Upload-PathElement"
          onClick={() => {
            FileSystemService.getChildren(null).then(() => {
              this.globalRefresh(FileSystemService.skeleton);
            });
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

      <div class="Upload-File-Box">
        {FileSystemService.dirInfo.directories.map((child, index) => {
          if (
            this.searchWord == '' ||
            child.dir_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
          ) {
            let count = 0;
            for (let i = 0; i < index; i++) {
              if (FileSystemService.dirInfo.directories[i].dir_name === child.dir_name) count++;
            }
            return (
              <div class="Upload-Item">
                <div class="Upload-Icon">
                  <div class="Upload-Inner-Image">
                    <img
                      class="Upload-Icon-Dots"
                      src="\assets\icon\3Dots-icon.svg"
                      onClick={e => e.stopPropagation()}
                    ></img>
                    <div class="Upload-Dots-Wrapper">
                      <div class="Upload-Dots-Content">
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
                              this.globalRefresh(FileSystemService.dirInfo.currentDir);
                            });
                          }}
                        >
                          <span>Delete Collection</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <img
                    class={{ 'Upload-Outer-Image': true }}
                    onClick={() => {
                      FileSystemService.getChildren(child.dir_id).then(() => {
                        this.globalRefresh(child.dir_id);
                      });
                    }}
                    src="\assets\icon\Folder-Image.svg"
                  ></img>
                </div>
                <span class="Upload-Image-Text">
                  {count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}
                </span>
              </div>
            );
          }
        })}
        {FileSystemService.dirInfo.files.map((child, index) => {
          if (
            this.searchWord == '' ||
            child.file_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
          ) {
            let count = 0;
            for (let i = 0; i < index; i++) {
              if (FileSystemService.dirInfo.files[i].file_name === child.file_name) count++;
            }
            return (
              <div class={{ 'Upload-Item': true, 'Highlight-File': this.fileArray.includes(child) ? true : false }}>
                <div class="Upload-Icon">
                  <div class="Upload-Inner-Image">
                    <img
                      class="Upload-Icon-Dots"
                      src="\assets\icon\3Dots-icon.svg"
                      onClick={e => e.stopPropagation()}
                    ></img>
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
                              this.globalRefresh(FileSystemService.dirInfo.currentDir);
                            });
                          }}
                        >
                          <span>Delete File</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <img
                    class="Upload-Outer-Image"
                    onClick={() => {
                      if (!this.fileArray.includes(child)) {
                        this.fileArray.push(child);
                      } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];

                      this.localRefresh();
                    }}
                    onDblClick={() => {
                      this.previewRequestHandler(child);
                    }}
                    src={FileSystemService.getIcon(child.file_type)}
                  ></img>
                </div>
                <span class="Upload-Image-Text">
                  {count === 0 ? child.file_name : child.file_name + ' (' + count + ')'}
                </span>
              </div>
            );
          }
        })}
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
