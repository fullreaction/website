import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../dbService';
import { User } from '../../auth/users/user.model';
import { fromBinaryUUID, toBinaryUUID } from 'binary-uuid';

// User Data Access Object

@Injectable()
export class UserDAO {
  constructor(private db: DatabaseService) {}
  async createUser(email: string, password: string) {
    await this.db
      .database<User>('users')
      .insert({
        user_email: email,
        user_pass: password,
      })
      .catch((e) => console.log(e));
    const user = await this.selectUser(email);
    return user;
  }

  async selectUser(
    selector: string, // email OR id
  ) {
    const [user]: User[] = await this.db
      .database<User>('users')
      .select('user_email', 'user_id', 'user_pass', 'updated_at')
      .where({ user_email: selector })
      .orWhere({ user_id: selector });

    if (user) {
      user.user_id = fromBinaryUUID(user.user_id as Buffer);
    }
    return user;
  }

  async selectAll() {
    const users: User[] = await this.db.database('users').select('*');
    users.forEach((it: User) => {
      it.user_id = fromBinaryUUID(it.user_id as Buffer);
    });
    return users;
  }

  async resetPassword(selector: string, user_pass: string) {
    await this.db
      .database<User>('users')
      .where({ user_email: selector })
      .orWhere({ user_id: toBinaryUUID(selector) })
      .update({ user_pass: user_pass });
  }

  async updateUsers(users: { user: User; deleted: boolean }[]) {
    const errorUsers: (User & {
      error: string;
    })[] = [];

    for await (const item of users) {
      const uniqueUser = await this.db
        .database<User>('users')
        .where('user_id', '<>', toBinaryUUID(item.user.user_id as string))
        .andWhere({
          user_email: item.user.user_email,
        });

      if (uniqueUser.length !== 0) {
        errorUsers.push({
          ...item.user,
          error: 'User with this email already exists',
        });
      }
    }

    if (errorUsers.length === 0) {
      users.forEach(async (item) => {
        if (item.deleted) {
          await this.db
            .database<User>('users')
            .where({
              user_id: toBinaryUUID(item.user.user_id as string),
            })
            .delete()
            .catch(console.log);
        } else {
          const updated_at = new Date(item.user.updated_at);
          await this.db
            .database<User>('users')
            .where({
              user_id: toBinaryUUID(item.user.user_id as string),
            })
            .andWhere('updated_at', '<', updated_at)
            .update({
              user_email: item.user.user_email,
              user_pass: item.user.user_pass,
              updated_at: updated_at,
            })
            .catch(console.log);
        }
      });
    }
    return errorUsers;
  }
}
