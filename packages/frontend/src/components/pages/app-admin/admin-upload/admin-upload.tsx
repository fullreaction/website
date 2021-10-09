import { Component, h, Host, State } from '@stencil/core';
import { FileEntry } from '../../../../models/upload.models';

import { FileSystemService, RecursiveSkeleton } from '../../../../services/file-system-services';

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
  @State() overlayVis = false;

  @State() fileArray: FileEntry[] = [];

  @State() forceRender = false;

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
      this.fsData = { name: '', id: FileSystemService.skeleton.dir_id, func: 'none' };
    });
  }
  async runFS(e) {
    e.preventDefault();
    if (this.fsData.func != 'none') {
      await FileSystemService[this.fsData.func](this.fsData.id, this.fsData.name);
    }
  }

  refreshDirectories(skel: RecursiveSkeleton | number) {
    if (typeof skel == 'number') {
      FileSystemService.findSkeleton(skel)
        .then(res => {
          return FileSystemService.getSkeleton(res);
        })
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.dirInfo.currentDir);
        })
        .then(() => {
          this.forceRender = !this.forceRender;
        });
    } else {
      FileSystemService.getSkeleton(skel)
        .then(() => {
          return FileSystemService.getChildren(FileSystemService.dirInfo.currentDir);
        })
        .then(() => {
          this.forceRender = !this.forceRender;
        });
    }
  }
  compAlertConfirm(e: CustomEvent) {
    if (this.overlayVis) {
      this.overlayVis = false;
      this.runFS(e)
        .then(() => {
          this.forceRender = !this.forceRender;
          this.refreshDirectories(this.fsData.id);
        })
        .then(() => {
          this.fsData = { id: null, name: '', func: 'none' };
        });
    }
  }
  render = () => (
    <Host>
      <div class="Upload">
        <upload-sidebar
          forceRender={this.forceRender}
          onRefreshRequest={e => {
            this.refreshDirectories(e.detail);
          }}
          onOverlayRequest={e => {
            this.overlayVis = true;
            this.fsData = e.detail;
          }}
        ></upload-sidebar>
        <upload-content
          forceRender={this.forceRender}
          onRefreshRequest={e => {
            this.refreshDirectories(e.detail);
          }}
          onOverlayRequest={e => {
            console.log(e);
            this.overlayVis = true;
            this.fsData = e.detail;
          }}
        ></upload-content>
      </div>

      <comp-alert
        hidden={!this.overlayVis}
        onConfirm={e => {
          this.compAlertConfirm(e);
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
