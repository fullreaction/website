import { Directory } from '../models/directory.model';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { AuthService } from './auth-service';

// ONLY FOR TESTING, NOT SUITABLE FOR USE

class FileSystemServiceController {
  async getRoot() {
    const user = await AuthService.getUser();
    const root: Directory = {
      owner: user,
      name: user.user_email,
      parent_id: null,
    };
    console.log(root);
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: root }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/getdir', fetchData)
      .then(handleFetch)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  async makeDir(dirName, parent: Directory) {
    const user = await AuthService.getUser();
    const dir: Directory = {
      name: dirName,
      owner: user,
    };
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: dir, parent: parent }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/dir', fetchData)
      .then(handleFetch)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }
}

export const FileSystemService = new FileSystemServiceController();
