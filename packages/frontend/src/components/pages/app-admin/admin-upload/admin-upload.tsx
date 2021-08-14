import { Component, h, Host, State } from '@stencil/core';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

/*
  Get items alphabetically
  Directories can't have duplicate names, they merge
  Downloading directories as zip

  Path Stylization
  Folder icon

*/

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  @State() overlayVis = false;
  @State() forceRender = false;
  @State() searchWord = '';

  private file: File;
  private fsData: { name: string; id: number; func: string };

  componentWillLoad() {
    return FileSystemService.init().then(() => {
      this.fsData = { name: '', id: FileSystemService.skeleton.dir_id, func: '' };
    });
  }
  async runFS(e) {
    e.preventDefault();
    await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name);
  }

  onFileChange(e) {
    if (e.target.files.length != null) {
      this.file = e.target.files[0];
      FileSystemService.uploadFile(this.file, FileSystemService.currentDir).then(() => {
        this.refreshDirectories();
      });
    }
  }

  refreshDirectories() {
    FileSystemService.getSkeleton(FileSystemService.skeleton)
      .then(() => {
        return FileSystemService.getChildren(FileSystemService.currentDir);
      })
      .then(() => {
        this.forceRender = !this.forceRender;
      });
  }
  drawSkeleton(skel: RecursiveSkeleton) {
    if (skel.children != null) {
      return skel.children.map(child => (
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
                }
              }}
            >
              <div class={{ 'Upload-Arrow': true, 'Upload-ArrowDown': child.showSubfolders }}></div>
            </div>
            <span class="Upload-CollectionName">{child.dir_name}</span>
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
                        this.refreshDirectories();
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
      ));
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
            onClick={() => {
              FileSystemService.getChildren(null).then(() => {
                this.forceRender = !this.forceRender;
              });
            }}
          >
            COLLECTIONS
          </span>
          {FileSystemService.path.map(elem => (
            <span
              onClick={() => {
                FileSystemService.getChildren(elem.dir_id).then(() => {
                  this.forceRender = !this.forceRender;
                });
              }}
            >
              {' > '}
              {elem.dir_name}
            </span>
          ))}
        </div>

        <div class="Upload-File-Box">
          {FileSystemService.dirChildren.directories.map(child => {
            if (
              this.searchWord == '' ||
              child.dir_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase())
            )
              return (
                <div class="Upload-Item">
                  <div class="Upload-Icon">
                    <img
                      class="Upload-Outer-Image"
                      onClick={() => {
                        FileSystemService.getChildren(child.dir_id).then(() => {
                          this.forceRender = !this.forceRender;
                        });
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
                                this.refreshDirectories();
                              });
                            }}
                          >
                            <span>Delete Collection</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="Upload-Image-Text">{child.dir_name}</span>
                </div>
              );
          })}
          {FileSystemService.dirChildren.files.map(child => {
            if (
              this.searchWord == '' ||
              (child.file_name.toLocaleLowerCase().includes(this.searchWord.toLocaleLowerCase()) &&
                this.forceRender != null)
            )
              return (
                <div class="Upload-Item">
                  <div class="Upload-Icon">
                    <img
                      class="Upload-Outer-Image"
                      onClick={() => {
                        FileSystemService.getFile(child);
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
                            }}
                          >
                            <span>Delete File</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span class="Upload-Image-Text">{child.file_name}</span>
                </div>
              );
          })}
        </div>
        <div class="Upload-Button-Box">
          <button class="Upload-Button-1">Cancel</button>
          <button class="Upload-Button-2 Button"> Select Media</button>
        </div>
      </div>
      <div
        class={{ 'Add-Overlay': true, 'Overlay-Vis': this.overlayVis }}
        onClick={() => {
          this.fsData = { id: null, name: '', func: '' };
          this.overlayVis = false;
        }}
      >
        <form
          class="Add-Overlay-Content"
          onSubmit={e => {
            if (this.overlayVis) {
              this.overlayVis = false;
              this.runFS(e)
                .then(() => {
                  this.refreshDirectories();
                })
                .then(() => {
                  this.forceRender = !this.forceRender;
                  this.fsData = { id: null, name: '', func: '' };
                });
            }
          }}
          onClick={e => e.stopPropagation()}
        >
          <div class="Add-Overlay-Text">
            {' '}
            {this.fsData.func == 'makeDir' ? 'Name Your Collection' : 'Rename Your Collection'}
          </div>

          <input
            class="Add-Overlay-Input"
            onInput={e => (this.fsData.name = (e.target as HTMLInputElement).value)}
            type="text"
            value={this.fsData.name}
            required
          ></input>
          <div class="Add-Overlay-Buttons">
            <input type="submit" value="Confirm" class="Add-Overlay-Button Button-Confirm"></input>
            <button
              class="Add-Overlay-Button Button-Cancel"
              onClick={() => {
                this.overlayVis = false;
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
