import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../dbService';

// File system Data Access Object

@Injectable()
export class FileSystemDAO {
  constructor(private db: DatabaseService) {}
  async initUser(email: string) {
    await this.db.database('directories').insert({
      dir_name: email,
      parent_id: null,
      user_id: this.db.database('users').select('user_id').where({ user_email: email }),
    });
    const root = await this.db.database('directories').select('dir_id').where({ dir_name: email });
    await this.db.database('relationships').insert({
      parent_id: root,
      child_id: root,
      depth: 0,
    });
  }
}
