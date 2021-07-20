import { AuthService } from './auth-service';
import { handleFetch, ROOT_URL } from '../utils/httpUtils';
//not functional at all yet still trying to think it through
class FileSystemServiceController {
  async getUser() {
    const user = await AuthService.getUser();
    const child = user.getChildren();
    const fetchData: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ dir: child }),
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
