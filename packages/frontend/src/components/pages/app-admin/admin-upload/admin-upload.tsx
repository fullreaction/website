import { Component, h, Host } from '@stencil/core';
import { Directory } from '../../../../models/directory.model';
import { AuthService } from '../../../../services/auth-service';

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
        onClick={async () => {
          const dir: Directory = {
            id: 2,
            parent_id: 1,
            owner: await AuthService.getUser(),
            name: 'test',
          };
          FileSystemService.makeDir('testface', dir);
        }}
      >
        make directory
      </button>
      <button
        onClick={async () => {
          const dir: Directory = {
            id: 2,
            parent_id: 1,
            owner: await AuthService.getUser(),
            name: 'test',
          };
          FileSystemService.removeDir(dir);
        }}
      >
        remove directory
      </button>
    </Host>
  );
}
