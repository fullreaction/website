import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MailingModule } from 'src/mailing/mailing.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './users/user.module';
import { SessionSerializer } from './utils/serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UserModule, PassportModule, MailingModule],
})
export class AuthModule {}
