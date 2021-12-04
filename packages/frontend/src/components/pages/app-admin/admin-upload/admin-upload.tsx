import { Component, h, Host, State } from '@stencil/core';
import { FileEntry } from '../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';
import { Searchbar } from './children-new/upload-searchbar-new/searchbar';

/*
   moving files and folders
  right click

  button is clicked -> parent to open overlay(event) -> parent runs runFS

  button is clicked -> overlay opens -> runFS

  --
  Watch forceRender prop, rerender state func


  Uploading folders (scrapped)
*/
export interface FSparams {
  name?: string;
  id: number;
  func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none';
}

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() searchWord = '';
  @State() overlayVis = false;

  @State() fileArray: FileEntry[] = [];

  @State() forceRender = false;

  @State() previewFile: { blob: Blob; entry: FileEntry } = { blob: null, entry: null };
  @State() previewSrc: string;

  private fsData: FSparams;

  private alertHeader = new Map<string, string>([
    ['makeDir', 'Name your new directory'],
    ['changeDirName', 'Rename directory'],
    ['changeFileName', 'Rename file'],
    ['none', ''],
  ]);

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.fsData = { name: '', id: FileSystemService.skeleton.dir_id, func: 'none' };
    });
  }
  async runFS(e) {
    e.preventDefault();
    if (this.fsData.func != 'none') {
      await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name);
    }
  }

  refresh() {
    this.forceRender = !this.forceRender;
  }
  updateData(skel: RecursiveSkeleton | number) {
    if (typeof skel == 'number') {
      FileSystemService.findSkeleton(skel)
        .then(res => {
          return FileSystemService.getSkeleton(res, true);
        })
        .then(() => {
          this.refresh();
        });
    } else {
      FileSystemService.getSkeleton(skel, true).then(() => {
        this.refresh();
      });
    }
  }
  compAlertConfirm(e: CustomEvent) {
    if (this.overlayVis) {
      this.overlayVis = false;
      this.runFS(e)
        .then(() => {
          this.updateData(this.fsData.id);
        })
        .then(() => {
          this.fsData = { id: null, name: '', func: 'none' };
        });
    }
  }
  async getImageBlob(file: FileEntry) {
    const allowedTypes = ['png', 'jpg', 'jpeg', 'svg'];
    if (allowedTypes.indexOf(file.file_type) != -1) {
      this.previewFile = { blob: await FileSystemService.getFile(file), entry: file };
      return true;
    } else return false;
  }

  render = () => (
    <Host>
      <image-view
        imageBlob={this.previewFile.blob}
        hideArrows={false}
        onLeftArrowClick={async () => {
          const fileIndex = FileSystemService.dirInfo.files.indexOf(this.previewFile.entry);
          for (let index = fileIndex - 1; index >= 0; index--) {
            if (await this.getImageBlob(FileSystemService.dirInfo.files[index])) break;
          }
        }}
        onRightArrowClick={async () => {
          const fileIndex = FileSystemService.dirInfo.files.indexOf(this.previewFile.entry);
          for (let index = fileIndex + 1; index < FileSystemService.dirInfo.files.length; index++) {
            if (await this.getImageBlob(FileSystemService.dirInfo.files[index])) break;
          }
        }}
      ></image-view>
      <div class="Upload">
        <upload-sidebar
          forceRender={this.forceRender}
          onRefreshRequest={() => this.refresh()}
          onUpdateRequest={e => {
            this.updateData(e.detail);
          }}
          onOverlayRequest={e => {
            this.overlayVis = true;
            this.fsData = e.detail;
            this.refresh();
          }}
        ></upload-sidebar>
        <div class="Upload-Content">
          <comp-searchbar></comp-searchbar>
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
                      this.updateData(child.dir_id);
                    }}
                    onDrop={() => {
                      FileSystemService.changeFileParent(FileSystemService.draggedFileId, child.dir_id).then(() => {
                        this.updateData(FileSystemService.dirInfo.currentDir.dir_id);
                        this.fileArray = [
                          ...this.fileArray.filter(value => value.file_id != FileSystemService.draggedFileId),
                        ];
                      });
                      FileSystemService.draggedFileId = null;
                      this.refresh();
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
                          this.overlayVis = true;
                        }}
                      >
                        Rename Folder
                      </dropdown-btn>
                      <dropdown-btn
                        onClick={e => {
                          e.stopPropagation();
                          FileSystemService.removeDirectory(child.dir_id).then(() => {
                            this.updateData(FileSystemService.dirInfo.currentDir.dir_id);
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

                      this.refresh();
                    }}
                    onDblClick={() => {
                      this.getImageBlob(child);
                    }}
                    onDragStart={() => {
                      //e.preventDefault();
                      FileSystemService.draggedFileId = child.file_id;
                      if (!this.fileArray.includes(child)) {
                        this.fileArray.push(child);
                      } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];

                      this.refresh();
                    }}
                    onDrag={() => {
                      if (!this.fileArray.includes(child)) {
                        this.fileArray.push(child);
                      }
                      this.refresh();
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
                          this.overlayVis = true;
                        }}
                      >
                        Rename File
                      </dropdown-btn>
                      <dropdown-btn
                        onClick={e => {
                          e.stopPropagation();
                          FileSystemService.deleteFile(child.file_id).then(() => {
                            this.updateData(FileSystemService.dirInfo.currentDir.dir_id);
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
        </div>
      </div>

      <comp-alert
        hidden={!this.overlayVis}
        onConfirm={e => {
          this.compAlertConfirm(e);
        }}
        onCancel={() => {
          this.overlayVis = false;
        }}
      >
        <div class="Add-Overlay-Text"> {this.alertHeader.get(this.fsData.func)}</div>

        <input
          class="Add-Overlay-Input"
          onInput={e => (this.fsData.name = (e.target as HTMLInputElement).value)}
          type="text"
          value={this.fsData.name}
          required
        ></input>
      </comp-alert>
    </Host>
  );
}
