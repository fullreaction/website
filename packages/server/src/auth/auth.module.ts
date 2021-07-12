import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from 'src/db';
import { ResetTokenDAO } from 'src/db/data-access-objects/reset-token.DAO';
import { FileSystemModule } from 'src/file-system/file-system.module';
import { MailingModule } from 'src/mailing/mailing.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './users/user.module';
import { SessionSerializer } from './utils/serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, ResetTokenDAO, DatabaseService],
  imports: [UserModule, PassportModule, MailingModule, FileSystemModule],
})
export class AuthModule {}
