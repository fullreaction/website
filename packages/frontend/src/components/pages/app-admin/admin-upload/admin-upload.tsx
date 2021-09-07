import { Component, h, Host, State, Event, EventEmitter } from '@stencil/core';
import { FileEntry } from '../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

/*
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

  @State() fileArray: FileEntry[] = [];

  private file: File;
  private fsData: { name: string; id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };

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
    if (this.fsData.func != 'none') await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name);
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

  render = () => (
    <Host class="Upload">
      <upload-sidebar
        hidden={this.forceRender == null}
        onRefresh={() => {
          this.forceRender = !this.forceRender;
        }}
      ></upload-sidebar>
      <upload-content hidden={this.forceRender == null}></upload-content>

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
