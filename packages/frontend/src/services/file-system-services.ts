import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
import { Directory } from '../models/upload.models';
//not functional at all yet still trying to think it through
class FileSystemServiceController {
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
