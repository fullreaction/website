import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../utils/guards';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getUsers() {
    const users = this.userService.getAll();
    return users;
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('update')
  async updateUsers(@Body('editedItems') editedItems: { user: User; deleted: boolean }[]) {
    return await this.userService.updateList(editedItems);
  }
}
