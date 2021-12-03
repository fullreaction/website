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

  private fsData: { id: number; func: 'makeDir' | 'changeDirName' | 'changeFileName' | 'none' };

  render = () => (
    <Host class="Upload-Content">
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
