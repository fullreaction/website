import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from './users/user.model';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status(@Req() req: Request) {
    const u = req.user as User;
    return { id: u.user_id, email: u.user_email };
  }

  @Get('check')
  async check(@Param() email: string) {
    const u = await this.authService.findOne(email);
    if (u) return true;
    else return false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async registerUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.addUser(email, password);
    return { id: user.user_id, email: user.user_email };
  }

  @Patch('reset')
  async resetPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    await this.authService.changePassword(email, password);
  }
}
