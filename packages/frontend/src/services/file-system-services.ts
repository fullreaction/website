import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';

//not functional at all yet still trying to think it through
export class RecursiveSkeleton {
  dir_name: string;
  dir_id: number;
  open = false;
  parent: RecursiveSkeleton;
  children: RecursiveSkeleton[];
}

class FileSystemServiceController {
  dirChildren: { directories: Directory[]; files: FileEntry[] };
  skeleton = new RecursiveSkeleton();
  path = 'Collections/';

  async makeDir(directory: Directory, parent: Directory) {
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir: directory, parent: parent }),
      credentials: 'include',
    };

    fetch(ROOT_URL + 'filesystem/makedir', fetchData)
      .then(console.log)
      .catch(console.log);
  }

  async getChild(dir_id: number, parent_id: number) {
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    console.log(dir_id);
    const user = await AuthService.getUser();
    if (dir_id == null) {
      const root: Directory = { owner: user.user_id, parent_id: null, dir_name: user.user_email };
      fetchData.body = JSON.stringify({ dir: root });
    } else fetchData.body = JSON.stringify({ dir: { owner: user.user_id, dir_id: dir_id, parent_id: 23 } });

    const res = await fetch(ROOT_URL + 'filesystem/getdir', fetchData).then(handleFetch);

    this.dirChildren = res;
    if (dir_id == null) this.skeleton.children = res.directories;
    console.log('RES BEGIN');
    console.log(dir_id);
    console.log(parent_id);
    console.log(res);
    console.log('RES END');
    return res;
  }
}
export const FileSystemService = new FileSystemServiceController();
