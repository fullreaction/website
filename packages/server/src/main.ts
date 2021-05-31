import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3333',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  }); //Remove this pre merge to main
  app.use(
    session({
      secret: 'testing', //Changeme
      resave: false,
      saveUninitialized: false,

      cookie: { maxAge: 60000 * 60 * 24, httpOnly: false, secure: false }, //turn on secure when HTTPS
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const cfgService = app.get(ConfigService);
  await app.listen(cfgService.get('PORT'));
}
bootstrap();
