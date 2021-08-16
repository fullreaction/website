import { Component, h, Host, State, Event, EventEmitter } from '@stencil/core';
import { FileEntry } from '../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

/*
  Icons by mimetype
  redo popups


  moving files and folders
  right click

  Uploading folders (scrapped)
*/

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() overlayVis = false;
  @State() forceRender = false;
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

  cancelMediaHandler() {
    this.cancelMedia.emit();
  }

  selectMediaHandler() {
    this.selectMedia.emit(this.fileArray);
  }

  private file: File;
  private fsData: { name: string; id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };

  private alertHeader = new Map<string, string>([
    ['makeDir', 'Name your new directory'],
    ['changeDirName', 'Rename directory'],
    ['changeFileName', 'Rename file'],
    ['none', 'spagetimitbols'],
  ]);

  private fileIcons = new Map<string, string>([
    ['mp4', 'assets/icon/Video-Image.svg'],
    ['mpeg', 'assets/icon/Video-Image.svg'],
    ['mp3', 'assets/icon/Audio-Image.svg'],
    ['wav', 'assets/icon/Audio-Image.svg'],
    ['png', 'assets/icon/Image-Image.svg'],
    ['jpeg', 'assets/icon/Image-Image.svg'],
    ['svg', 'assets/icon/Image-Image.svg'],
    ['doc', 'assets/icon/Doc-Image.svg'],
    ['pdf', 'assets/icon/Doc-Image.svg'],
  ]);

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.fsData = { name: '', id: FileSystemService.skeleton.dir_id, func: 'none' };
    });
  }
  async runFS(e) {
    e.preventDefault();
    await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name);
  }

  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, FileSystemService.currentDir)
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.currentDir);
        })
        .then(() => {
          this.forceRender = !this.forceRender;
        });
    }
  }

  refreshDirectories(skel: RecursiveSkeleton | number) {
    if (typeof skel == 'number') {
      FileSystemService.findSkeleton(skel)
        .then(res => {
          return FileSystemService.getSkeleton(res);
        })
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.currentDir);
        })
        .then(() => {
          this.forceRender = !this.forceRender;
        });
    } else {
      FileSystemService.getSkeleton(skel)
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.currentDir);
        })
        .then(() => {
          this.forceRender = !this.forceRender;
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
                  this.forceRender = !this.forceRender;
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

                      this.forceRender = !this.forceRender;
                    });
                  else {
                    child.showSubfolders = !child.showSubfolders;
                    this.forceRender = !this.forceRender;
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
                        this.fsData.id = child.dir_id;
                        this.fsData.func = 'makeDir';
                        this.overlayVis = true;
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
                        this.fsData.id = child.dir_id;
                        this.fsData.func = 'changeDirName';

                        this.overlayVis = true;
                      }}
                    >
                      <span>Rename Collection</span>
                    </button>
                    <button
                      class="Content-Item"
                      onClick={e => {
                        e.stopPropagation();
                        FileSystemService.removeDirectory(child.dir_id).then(() => {
                          this.refreshDirectories(skel);
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
    <Host class="Upload">
      <div class="Upload-Side">
        <label class="Upload-Media-Button">
          <input type="file" onChange={e => this.onFileChange(e)} />
          Upload Media
        </label>
        <div
          class="Upload-Collection Upload-CollectionHeader"
          onClick={() => {
            FileSystemService.getChildren(null).then(() => {
              this.forceRender = !this.forceRender;
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
                    this.fsData.id = FileSystemService.skeleton.dir_id;
                    console.log(FileSystemService.skeleton);
                    this.fsData.func = 'makeDir';

                    this.overlayVis = !this.overlayVis;
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
                this.forceRender = !this.forceRender;
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
                  FileSystemService.getChildren(elem.dir_id).then(() => {
                    this.forceRender = !this.forceRender;
                  });
                }}
              >
                {elem.dir_name}
              </span>
            </span>
          ))}
        </div>

        <div class="Upload-File-Box">
          {FileSystemService.dirChildren.directories.map((child, index) => {
            if (
              this.searchWord == '' ||
              child.dir_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
            ) {
              let count = 0;
              for (let i = 0; i < index; i++) {
                if (FileSystemService.dirChildren.directories[i].dir_name === child.dir_name) count++;
              }
              return (
                <div class="Upload-Item">
                  <div class="Upload-Icon">
                    <img
                      class={{ 'Upload-Outer-Image': true }}
                      onClick={() => {
                        FileSystemService.getChildren(child.dir_id).then(() => {
                          this.forceRender = !this.forceRender;
                        });
                      }}
                      src="\assets\icon\Folder-Image.svg"
                    ></img>
                    <div class="Upload-Inner-Image">
                      <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()}></img>
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
                              this.fsData.id = child.dir_id;
                              this.fsData.func = 'changeDirName';
                              this.overlayVis = true;
                            }}
                          >
                            <span>Rename Collection</span>
                          </button>
                          <button
                            class="Content-Item"
                            onClick={e => {
                              e.stopPropagation();
                              FileSystemService.removeDirectory(child.dir_id).then(() => {
                                this.refreshDirectories(child.parent_id);
                              });
                            }}
                          >
                            <span>Delete Collection</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="Upload-Image-Text">
                    {count === 0 ? child.dir_name : child.dir_name + ' (' + count + ')'}
                  </span>
                </div>
              );
            }
          })}
          {FileSystemService.dirChildren.files.map((child, index) => {
            if (
              this.searchWord == '' ||
              (child.file_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase()) &&
                this.forceRender != null)
            ) {
              let count = 0;
              for (let i = 0; i < index; i++) {
                if (FileSystemService.dirChildren.files[i].file_name === child.file_name) count++;
              }
              return (
                <div class={{ 'Upload-Item': true, 'Highlight-File': this.fileArray.includes(child) ? true : false }}>
                  <div class="Upload-Icon">
                    <img
                      class="Upload-Outer-Image"
                      onClick={() => {
                        if (!this.fileArray.includes(child)) {
                          this.fileArray.push(child);
                        } else this.fileArray = [...this.fileArray.filter(value => value.file_id != child.file_id)];
                        this.forceRender = !this.forceRender;
                      }}
                      src="\assets\icon\blank-image.svg"
                    ></img>
                    <div class="Upload-Inner-Image">
                      <img src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()}></img>
                      <div class="Upload-Dots-Wrapper">
                        <div class="Upload-Dots-Content">
                          <button
                            class="Content-Item"
                            onClick={e => {
                              e.stopPropagation();
                              this.fsData.func = 'changeFileName';
                              this.fsData.id = child.file_id;
                              this.overlayVis = true;
                            }}
                          >
                            <span>Rename File</span>
                          </button>
                          <button
                            class="Content-Item"
                            onClick={e => {
                              e.stopPropagation();
                              FileSystemService.deleteFile(child.file_id)
                                .then(() => {
                                  return FileSystemService.getChildren(FileSystemService.currentDir);
                                })
                                .then(() => {
                                  this.forceRender = !this.forceRender;
                                });
                            }}
                          >
                            <span>Delete File</span>
                          </button>
                        </div>
                      </div>
                    </div>
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
      </div>

      <comp-alert
        hidden={!this.overlayVis}
        onConfirm={e => {
          if (this.overlayVis) {
            this.overlayVis = false;
            this.runFS(e)
              .then(() => {
                this.refreshDirectories(this.fsData.id);
              })
              .then(() => {
                this.fsData = { id: null, name: '', func: 'none' };
              });
          }
        }}
        onCancel={e => {
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
