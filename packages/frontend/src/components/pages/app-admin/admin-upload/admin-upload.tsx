import { Component, h, Host } from '@stencil/core';
import { Directory } from '../../../../models/directory.model';
import { AuthService } from '../../../../services/auth-service';

import { FileSystemService } from '../../../../services/file-system-service';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})

//Again, this is not good code, its only for testing.
export class AdminUpload {
  private file: File;
  private currentChildren: { directories: Directory[]; files };
  async onFileChange(ev) {
    this.file = ev.target.files[0];

    FileSystemService.uploadFile(this.file, (await FileSystemService.getRoot()).directories[0]);
  }
  async uploadFile() {
    console.log(await FileSystemService.getRoot());
  }
  render = () => (
    <Host class="Upload">
      <div>
        <button>Get files</button>
        <button onClick={async () => (this.currentChildren = await FileSystemService.getRoot())}>Get directory</button>
        <button onClick={this.uploadFile}>upload file</button>
        <button
          onClick={async () => {
            FileSystemService.makeDir('testface', null);
          }}
        >
          make directory
        </button>
        <button
          onClick={async () => {
            const dir: Directory = {
              id: 2,
              parent_id: 1,
              owner: (await AuthService.getUser()).user_id,
              name: 'test',
            };
            FileSystemService.removeDir(dir);
          }}
        >
          remove directory
        </button>
      </div>
      <div>
        <input type="file" onChange={e => this.onFileChange(e)}></input>
      </div>
    </Host>
  );
}
