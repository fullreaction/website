import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';
import FileSaver from 'file-saver';

//not functional at all yet still trying to think it through
export class RecursiveSkeleton {
  dir_name: string;
  dir_id: number;
  showSubfolders = false;
  showSettings = false;
  children: RecursiveSkeleton[] = [];
}

class FileSystemServiceController {
  dirChildren: { directories: Directory[]; files: FileEntry[] };
  currentDir: number;
  skeleton = new RecursiveSkeleton();
  path: { dir_name: string; dir_id: number }[] = [];

  async init() {
    await this.getSkeleton(this.skeleton);
    await this.getChildren(null);
  }
  async getFile(file: FileEntry) {
    const fetchData: RequestInit = {
      method: 'GET',
      credentials: 'include',
    };

    FileSaver.saveAs(
      await (await fetch(ROOT_URL + 'filesystem/getfile/' + file.file_id, fetchData)).blob(),
      file.file_name,
    );
  }
  async uploadFile(file: File, dir_id: number) {
    const user = await AuthService.getUser();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dir_id', JSON.stringify(dir_id));
    formData.append('owner', user.user_id as string);

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

  async makeDir(parent: RecursiveSkeleton, dir_name: string) {
    const user = await AuthService.getUser();
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_name: dir_name, owner: user.user_id, parent_id: parent.dir_id }),
      credentials: 'include',
    };

    const res = await fetch(ROOT_URL + 'filesystem/makedir', fetchData);
  }
  async changeDirName(directory: RecursiveSkeleton, name: string) {
    const fetchData: RequestInit = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: directory.dir_id, name: name }),
      credentials: 'include',
    };
    await fetch(ROOT_URL + 'filesystem/changedirname', fetchData);
  }

  async removeDirectory(dir_id: number) {
    const fetchData: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: dir_id }),
      credentials: 'include',
    };
    const res = await fetch(ROOT_URL + 'filesystem/removedir', fetchData);
  }
  async getChildren(dir_id: number) {
    const user = await AuthService.getUser();
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: dir_id, owner: user.user_id }),
      credentials: 'include',
    };
    const res = await fetch(ROOT_URL + 'filesystem/getdir', fetchData).then(handleFetch);

    this.dirChildren = res;
    await this.getPath(dir_id);
    this.currentDir = dir_id;
  }
  private async getPath(dir_id: number) {
    const fetchData: RequestInit = {
      method: 'GET',
      credentials: 'include',
    };

    this.path = await fetch(ROOT_URL + 'filesystem/getpath/' + dir_id, fetchData).then(handleFetch);
    console.log(this.path);
  }
  async getSkeleton(skel: RecursiveSkeleton) {
    const user = await AuthService.getUser();
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_id: skel.dir_id, owner: user.user_id }),
      credentials: 'include',
    };
    const res = await fetch(ROOT_URL + 'filesystem/getskel', fetchData).then(handleFetch);

    skel.dir_name = res.root.dir_name;
    skel.children = res.children.map(val => {
      return { dir_id: val.dir_id, dir_name: val.dir_name };
    });

    return res;
  }
}
export const FileSystemService = new FileSystemServiceController();
