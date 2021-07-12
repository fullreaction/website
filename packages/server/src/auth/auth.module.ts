import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from 'src/db';
import { ResetTokenDAO } from 'src/db/data-access-objects/reset-token.DAO';
import { FileSystemService } from 'src/file-system/file-system.service';
import { MailingModule } from 'src/mailing/mailing.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './users/user.module';
import { SessionSerializer } from './utils/serializer';
import { FileSystemDAO } from '../db/data-access-objects/file-system.DAO';

@Module({
  controllers: [AuthController],
  providers: [
    DatabaseService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    ResetTokenDAO,
    FileSystemService,
    FileSystemDAO,
  ],
  imports: [UserModule, PassportModule, MailingModule],
})
export class AuthModule {}
