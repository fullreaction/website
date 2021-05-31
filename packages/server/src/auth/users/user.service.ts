import { Injectable } from '@nestjs/common';
import { UserDAO } from '../../db/data-access-objects/user.DAO';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userDAO: UserDAO) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userDAO.selectUser(email);

    return user;
  }
  async addUser(email: string, password: string) {
    const user = await this.userDAO.createUser(email, password);

    return user;
  }

  async getAll() {
    return [...(await this.userDAO.selectAll())];
  }

  async changePassword(email: string, password: string) {
    this.userDAO.resetPassword(email, password);
  }

  async updateList(users: { user: User; deleted: boolean }[]) {
    return await this.userDAO.updateUsers(users);
  }
}
