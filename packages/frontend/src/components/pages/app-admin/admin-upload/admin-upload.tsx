import { Component, h, Host, Prop, State } from '@stencil/core';
import { FileEntry } from '../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

/*
   moving files and folders
  right click

  Making enter work on comp-alert

  Uploading folders (scrapped)
*/
export interface FSparams {
  name?: string;
  id: number;
  parent_id?: number;
  func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none';
}

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() skeleton: RecursiveSkeleton;
  @State() currentDir: RecursiveSkeleton;

  @State() searchWord = '';
  @State() overlayVis = false;

  @State() fileArray: FileEntry[] = [];

  @State() previewFile: { blob: Blob; entry: FileEntry } = { blob: null, entry: null };
  @State() previewSrc: string;

  private file: File;
  private fsData: FSparams;

  private alertHeader = new Map<string, string>([
    ['makeDir', 'Name your new directory'],
    ['changeDirName', 'Rename directory'],
    ['changeFileName', 'Rename file'],
    ['none', ''],
  ]);

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.refresh();
      this.fsData = { name: '', parent_id: null, id: this.skeleton.dir_id, func: 'none' };
    });
  }
  async runFS(e) {
    e.preventDefault();
    console.log('amount');
    if (this.fsData.func == 'makeDir') {
      await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name).then(() => {
        this.refresh();
      });
    } else if (this.fsData.func != 'none') {
      await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.parent_id, this.fsData.name).then(() => {
        this.refresh();
      });
    }
  }

  compAlertConfirm(e: CustomEvent) {
    if (this.overlayVis) {
      this.overlayVis = false;
      this.runFS(e).then(() => {
        this.skeleton = { ...FileSystemService.skeleton };
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
  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, this.currentDir.dir_id).then(() => {
        this.refresh();
        e.target.value = null;
      });
    }
  }
  refresh() {
    this.skeleton = FileSystemService.skeleton;
    this.currentDir = FileSystemService.currentDir;
  }
  async leftArrowClick() {
    const fileIndex = this.currentDir.files.indexOf(this.previewFile.entry);
    for (let index = fileIndex - 1; index >= 0; index--) {
      if (await this.getImageBlob(this.currentDir.files[index])) break;
    }
  }

  render = () => (
    <Host>
      <image-view
        imageBlob={this.previewFile.blob}
        hideArrows={false}
        onLeftArrowClick={async () => {
          await this.leftArrowClick();
        }}
        onRightArrowClick={async () => {
          const fileIndex = this.currentDir.files.indexOf(this.previewFile.entry);
          for (let index = fileIndex + 1; index < this.currentDir.files.length; index++) {
            if (await this.getImageBlob(this.currentDir.files[index])) break;
          }
        }}
      ></image-view>
      <div class="Upload">
        <div class="Upload-Side">
          <label class="Upload-Media-Button">
            <input type="file" onChange={e => this.onFileChange(e)} />
            Upload Media
          </label>
          <div
            class="Upload-Collection Upload-CollectionHeader"
            onClick={() => {
              FileSystemService.getChildren(null, true).then(() => {
                this.currentDir = FileSystemService.currentDir;
              });
            }}
          >
            <span>COLLECTIONS</span>
            <button class="Upload-Dots">
              <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
              <dropdown-shell>
                <dropdown-btn
                  onClick={e => {
                    e.stopPropagation();
                    this.fsData = { id: this.skeleton.dir_id, func: 'makeDir' };

                    this.overlayVis = true;
                  }}
                >
                  Add Collection
                </dropdown-btn>
              </dropdown-shell>
            </button>
          </div>
          <comp-tree
            tree={this.skeleton}
            fileDetailFactory={(child: FileEntry) => {
              return (
                <button class="Upload-Dots">
                  <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />

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
                        this.fsData = { id: child.file_id, parent_id: child.parent_id, func: 'changeFileName' };
                        this.overlayVis = true;
                      }}
                    >
                      Rename File
                    </dropdown-btn>
                    <dropdown-btn
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.deleteFile(child.file_id, child.parent_id).then(() => {
                          this.refresh();
                        });
                      }}
                    >
                      Delete File
                    </dropdown-btn>
                  </dropdown-shell>
                </button>
              );
            }}
            folderDetailFactory={(child: RecursiveSkeleton) => {
              return (
                <button class="Upload-Dots">
                  <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
                  <dropdown-shell>
                    <dropdown-btn
                      onClick={e => {
                        e.stopPropagation();
                        this.fsData = { id: child.dir_id, parent_id: child.parent_id, func: 'makeDir' };
                        this.overlayVis = true;
                      }}
                    >
                      Add Collection
                    </dropdown-btn>
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
                        this.fsData = { id: child.dir_id, parent_id: child.parent_id, func: 'changeDirName' };
                        this.overlayVis = true;
                      }}
                    >
                      Rename Folder
                    </dropdown-btn>
                    <dropdown-btn
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.removeDirectory(child.dir_id, child.parent_id).then(() => {
                          this.refresh();
                        });
                      }}
                    >
                      Delete Folder
                    </dropdown-btn>
                  </dropdown-shell>
                </button>
              );
            }}
          ></comp-tree>
        </div>

        <div class="Upload-Content">
          <comp-searchbar></comp-searchbar>
          <itembox-shell>
            {this.currentDir.directories.map((child, index) => {
              if (
                this.searchWord == '' ||
                child.dir_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
              ) {
                let count = 0;
                for (let i = 0; i < index; i++) {
                  if (this.currentDir.directories[i].dir_name === child.dir_name) count++;
                }
                return (
                  <itembox-content
                    onItemClick={() => {
                      FileSystemService.getChildren(child.dir_id, true).then(() => {
                        this.currentDir = { ...FileSystemService.currentDir };
                      }); // moveTo dir
                    }}
                    onDrop={e => {
                      const dragId = JSON.parse(e.dataTransfer.getData('text')).dragId;

                      FileSystemService.changeFileParent(dragId, child.dir_id, child.parent_id).then(() => {
                        this.refresh();
                        this.fileArray = [...this.fileArray.filter(value => value.file_id != dragId)];
                      });
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
                          this.fsData = { id: child.dir_id, parent_id: child.parent_id, func: 'changeDirName' };
                          this.overlayVis = true;
                        }}
                      >
                        Rename Folder
                      </dropdown-btn>
                      <dropdown-btn
                        onClick={e => {
                          e.stopPropagation();
                          FileSystemService.removeDirectory(child.dir_id, child.parent_id).then(() => {
                            this.refresh();
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
            {this.currentDir.files.map((child, index) => {
              if (
                this.searchWord == '' ||
                child.file_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
              ) {
                let count = 0;
                for (let i = 0; i < index; i++) {
                  if (this.currentDir.files[i].file_name === child.file_name) count++;
                }
                return (
                  <itembox-content
                    class={{ 'Highlight-File': this.fileArray.includes(child) }}
                    onItemClick={() => {
                      if (!this.fileArray.includes(child)) {
                        this.fileArray = [...this.fileArray, child];
                      } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];
                    }}
                    onDblClick={() => {
                      this.getImageBlob(child);
                    }}
                    onDragStart={e => {
                      //e.preventDefault();
                      e.dataTransfer.setData('text', JSON.stringify({ dragId: child.file_id }));
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
                          this.fsData = { id: child.file_id, parent_id: child.parent_id, func: 'changeFileName' };
                          this.overlayVis = true;
                        }}
                      >
                        Rename File
                      </dropdown-btn>
                      <dropdown-btn
                        onClick={e => {
                          e.stopPropagation();
                          FileSystemService.deleteFile(child.file_id, child.parent_id).then(() => {
                            this.refresh();
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
