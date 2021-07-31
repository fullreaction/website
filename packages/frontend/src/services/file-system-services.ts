import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory, FileEntry } from '../models/upload.models';
//not functional at all yet still trying to think it through
class RecursiveSkeleton {
  dir_name: string;
  dir_id: number;
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

  async getChild(directory: Directory) {
    const fetchData: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    if (directory == null) {
      const user = await AuthService.getUser();
      const root: Directory = { owner: user.user_id, parent_id: null, dir_name: user.user_email };
      fetchData.body = JSON.stringify({ dir: root });
    } else fetchData.body = JSON.stringify({ dir: directory });

    const res = await fetch(ROOT_URL + 'filesystem/getdir', fetchData).then(handleFetch);

    this.dirChildren = res;
    if (directory == null) this.skeleton.children = res.directories;
    console.log(this.skeleton);
    return res;
  }
}
export const FileSystemService = new FileSystemServiceController();
