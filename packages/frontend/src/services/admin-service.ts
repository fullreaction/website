import { gvmHttpErrorResponse, handleFetch, ROOT_URL } from '../utils/httpUtils';
import { User } from '../models/user.model';

class AdminServiceController {
  private users: User[] = [];

  async fetchList(): Promise<void>;
  async fetchList(done: (users: User[]) => void): Promise<void>;
  async fetchList(done?: (users: User[]) => void): Promise<void> {
    this.users = [];
    fetch(ROOT_URL + 'api/user/list', { method: 'GET' })
      .then(handleFetch)
      .then(data => {
        data.map(val => {
          this.users.push({
            updated_at: new Date(val.updated_at),
            user_email: val.user_email,
            user_pass: val.user_pass,
            user_id: val.user_id,
            errors: new Map(),
          });
        });
        if (typeof done != 'undefined') done([...this.users]);
      })
      .catch((e: gvmHttpErrorResponse) => {
        console.log(e);
      });
  }

  getList() {
    return [...this.users];
  }

  commitList(newList: User[]) {
    console.log(newList);
    const editedItems: { user: User; deleted: boolean }[] = [];
    this.users.forEach(item => {
      const i = newList.findIndex(u => u.user_id == item.user_id);
      if (i == -1) {
        editedItems.push({ user: item, deleted: true });
      } else if (newList[i].user_email !== item.user_email || newList[i].user_pass !== item.user_pass) {
        editedItems.push({ user: newList[i], deleted: false });
      }
    });
    this.users = newList;
    if (editedItems != []) {
      const fetchData: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({ editedItems: editedItems }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      fetch(ROOT_URL + 'api/user/update', fetchData)
        .then(e => e.json())
        .then(data => {
          data.forEach(item => {
            this.users[this.users.findIndex(u => u.user_id == item.user_id)].errors.set('user_email', item.error);
          });
        })
        .catch((e: gvmHttpErrorResponse) => {
          this.fetchList();
          console.log(e);
        });
    }
  }
}

export const AdminService = new AdminServiceController();
