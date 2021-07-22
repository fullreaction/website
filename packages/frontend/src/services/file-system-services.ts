import { Directory } from '../models/upload.models';
import { ROOT_URL } from '../utils/httpUtils';
import { AuthService } from './auth-service';

class FileSystemServiceController {
  async getgrussy() {
    const user = await AuthService.getUser();
    const root: Directory = {
      owner: user.user_id,
      dir_name: user.user_email,
      parent_id: null,
    };
    const dir: Directory = {
      owner: user.user_id,
      dir_name: 'Shween',
    };

    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: dir, parent: root }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };

    fetch(ROOT_URL + 'filesystem/makedir', fetchData)
      .then(console.log)
      .catch(console.log);
  }

  async removeDir(dir: Directory) {
    const fetchData: RequestInit = {
      method: 'DELETE',
      body: JSON.stringify({ dir: dir }),
      headers: { 'Content-Type': 'Application/json' },
      credentials: 'include',
    };
    fetch(ROOT_URL + 'filesystem/removedir', fetchData)
      .then(console.log)
      .catch(console.log);
  }
}

export const FileSystem = new FileSystemServiceController();
