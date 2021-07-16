import { Directory, FileEntry } from '../models/upload.models';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { AuthService } from './auth-service';

// ONLY FOR TESTING, NOT SUITABLE FOR USE

class FileSystemServiceController {
  currentDir: { directories: Directory[]; files: FileEntry[] };
  async getRoot() {
    await this.updateRoot().then(() => console.log(this.currentDir));

    return this.currentDir;
  }
  updateRoot() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const user = await AuthService.getUser();
      const root: Directory = {
        owner: user.user_id,
        dir_name: user.user_email,
        parent_id: null,
      };

      const fetchData: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ dir: root }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      fetch(ROOT_URL + 'filesystem/getdir', fetchData)
        .then(handleFetch)
        .then(data => {
          this.currentDir = data;
          resolve('200');
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }
  async getFile() {
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ file: this.currentDir.files[0] }),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/getfile', fetchData).then(res => res.body);
  }
  async uploadFile(file: File, parent: Directory) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dir', JSON.stringify(parent));
    const fetchData: RequestInit = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/uploadfile', fetchData)
      .then(handleFetch)
      .then(console.log)
      .catch(console.log);
  }
  async makeDir(dirName, parent: Directory) {
    const user = await AuthService.getUser();
    const dir: Directory = {
      dir_name: dirName,
      owner: user.user_id,
    };
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: dir, parent: parent }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/makedir', fetchData)
      .then(handleFetch)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  async removeDir(dir: Directory) {
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: dir }),
      headers: { 'Content-Type': 'Application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/removedir', fetchData)
      .then(handleFetch)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }
}

export const FileSystemService = new FileSystemServiceController();
