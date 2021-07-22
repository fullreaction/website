import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory } from '../models/upload.models';
//not functional at all yet still trying to think it through
class FileSystemServiceController {
  async makeDir() {
    const user = await AuthService.getUser();
    const childDir: Directory = { owner: user.user_id, dir_name: 'childDir' };
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: childDir, parent: null }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/makedir', fetchData)
      .then(console.log)
      .catch(console.log);
  }

  async getChild() {
    const user = await AuthService.getUser();
    const root: Directory = { owner: user.user_id, parent_id: null, dir_name: user.user_email };
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
}
export const FileSystemService = new FileSystemServiceController();
