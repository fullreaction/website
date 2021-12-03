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
      <itembox-shell>
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
              <itembox-content
                onItemClick={() => {
                  this.globalRefresh(child.dir_id);
                }}
                onDrop={() => {
                  FileSystemService.changeFileParent(FileSystemService.draggedFileId, child.dir_id).then(() => {
                    this.globalRefresh(FileSystemService.dirInfo.currentDir.dir_id);
                    this.fileArray = [
                      ...this.fileArray.filter(value => value.file_id != FileSystemService.draggedFileId),
                    ];
                  });
                  FileSystemService.draggedFileId = null;
                }}
                onDragOver={e => e.preventDefault()}
                itemName={count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}
                itemIcon="\assets\icon\Folder-Image.svg"
                showDots
              >
                <dropdown-shell>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      FileSystemService.downloadDir(child.dir_id, child.dir_name);
                    }}
                  >
                    Download Folder
                  </dropdown-btn>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      this.fsData = { id: child.dir_id, func: 'changeDirName' };
                      this.overlayRequestHandler();
                    }}
                  >
                    Rename Folder
                  </dropdown-btn>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      FileSystemService.removeDirectory(child.dir_id).then(() => {
                        this.globalRefresh(FileSystemService.dirInfo.currentDir.dir_id);
                      });
                    }}
                  >
                    Delete Folder
                  </dropdown-btn>
                </dropdown-shell>
              </itembox-content>
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
              <itembox-content
                class={{ 'Highlight-File': this.fileArray.includes(child) }}
                onItemClick={() => {
                  if (!this.fileArray.includes(child)) {
                    this.fileArray.push(child);
                  } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];

                  this.localRefresh();
                }}
                onDblClick={() => {
                  this.previewRequestHandler(child);
                }}
                onDragStart={() => {
                  //e.preventDefault();
                  FileSystemService.draggedFileId = child.file_id;
                  if (!this.fileArray.includes(child)) {
                    this.fileArray.push(child);
                  } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];

                  this.localRefresh();
                }}
                onDrag={() => {
                  if (!this.fileArray.includes(child)) {
                    this.fileArray.push(child);
                  }
                  this.localRefresh();
                }}
                draggable
                itemName={count === 0 ? child.file_name : child.file_name + ' (' + count + ')'}
                itemIcon={FileSystemService.getIcon(child.file_type)}
                showDots
              >
                <dropdown-shell>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      FileSystemService.downloadFile(child);
                    }}
                  >
                    Download File
                  </dropdown-btn>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      this.fsData = { id: child.file_id, func: 'changeFileName' };
                      this.overlayRequestHandler();
                    }}
                  >
                    Rename File
                  </dropdown-btn>
                  <dropdown-btn
                    onClick={e => {
                      e.stopPropagation();
                      FileSystemService.deleteFile(child.file_id).then(() => {
                        this.globalRefresh(FileSystemService.dirInfo.currentDir.dir_id);
                      });
                    }}
                  >
                    Delete File
                  </dropdown-btn>
                </dropdown-shell>
              </itembox-content>
            );
          }
        })}
      </itembox-shell>
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
