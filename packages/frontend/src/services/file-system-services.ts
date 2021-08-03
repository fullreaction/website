import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';

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
  skeleton = new RecursiveSkeleton();
  path = 'Collections/';

  async init() {
    await this.getSkeleton(this.skeleton);
    await this.getChildren(null);
  }

  async makeDir(dir_name: string, parent_id: number) {
    const user = await AuthService.getUser();
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir_name: dir_name, owner: user.user_id, parent_id: parent_id }),
      credentials: 'include',
    };

    const res = await fetch(ROOT_URL + 'filesystem/makedir', fetchData);
    console.log(res);
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
    console.log(res);
    this.dirChildren = res;
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
    if (skel.dir_id == null) this.dirChildren = res;
    console.log(res);
    skel.children = res.map(val => {
      return { dir_id: val.dir_id, dir_name: val.dir_name, parent: skel };
    });

    return res;
  }
}
export const FileSystemService = new FileSystemServiceController();
