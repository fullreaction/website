import { Module } from '@nestjs/common';
import { UserDAO } from '../../db/data-access-objects/user.DAO';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserDAO],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
