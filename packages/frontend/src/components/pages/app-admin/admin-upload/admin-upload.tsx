import { Component, h, Host } from '@stencil/core';
import { Directory, FileEntry } from '../../../../models/upload.models';
import { AuthService } from '../../../../services/auth-service';
import { FileSystemService } from '../../../../services/file-system-services';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  children: { directories: Directory[]; files: FileEntry[] };
  componentWillLoad() {
    return FileSystemService.getChild(null);
  }

  directoryClicked(dir: Directory) {
    FileSystemService.path += dir.dir_name + '/';
  }
  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <buttonasync
          class="Button"
          onClick={async () => {
            const user = await AuthService.getUser();
            const newDir: Directory = { dir_name: 'Naming Convention', parent_id: null, owner: user.user_id };
            FileSystemService.makeDir(newDir, null);
          }}
        >
          Upload Media
        </buttonasync>
        <div class="Upload-Collections">
          COLLECTIONS
          <button class="Upload-Dots">
            <img src="\assets\icon\3Dots-icon.svg" />
            <div id="addDropdown" class="Upload-Dots-Content">
              <button>Add Collection</button>
            </div>
          </button>
        </div>
        <button class="Upload-Collection">
          Images
          <div></div>
        </button>
        {FileSystemService.skeleton.children.map(val => (
          <button class="Upload-Collection">
            {val.dir_name}
            <img class="Upload-EditDots" src="\assets\icon\3Dots-icon.svg" />
          </button>
        ))}
      </div>

      <div class="Upload-Content">
        <input class="Upload-Searchbar" type="text" placeholder="Search" />
        <div class="Upload-Categories"> COLLECTIONS &#62;&nbsp;</div>
        <div class="Upload-File-Box">
          {FileSystemService.dirChildren.directories.map(val => (
            <div class="Upload-Item">
              <img class="Upload-Outer-Image" src="\assets\icon\blank-image.svg">
                <img class="Upload-inner-Image" src="\assets\icon\3Dots-icon.svg"></img>
              </img>
              <span class="Upload-Image-Text">{val.dir_name}</span>
            </div>
          ))}
          {FileSystemService.dirChildren.files.map(val => (
            <div class="Upload-Item">
              <img class="Upload-Outer-Image" src="\assets\icon\blank-image.svg">
                <img class="Upload-inner-Image" src="\assets\icon\3Dots-icon.svg"></img>
              </img>
              <span class="Upload-Image-Text">{val.file_name}</span>
            </div>
          ))}
        </div>
        <div class="Upload-Button-Box">
          <button class="Upload-Button-1">Cancel</button>
          <button class="Upload-Button-2 Button"> Select Media</button>
        </div>
      </div>
    </Host>
  );
}
