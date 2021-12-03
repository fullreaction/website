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
          }}
        ></upload-sidebar>
        <div class="Upload-Content">
          <comp-searchbar></comp-searchbar>
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
