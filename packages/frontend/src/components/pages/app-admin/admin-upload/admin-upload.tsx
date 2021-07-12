import { Component, h, Host } from '@stencil/core';

import { FileSystemService } from '../../../../services/file-system-service';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  render = () => (
    <Host class="Upload">
      <button>Get files</button>
      <button onClick={() => FileSystemService.getRoot()}>Get directory</button>
      <button>upload file</button>
      <button
        onClick={() => {
          FileSystemService.makeDir('testDir', null);
        }}
      >
        make directory
      </button>
    </Host>
  );
}
