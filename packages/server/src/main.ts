import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // REMEMBER
  const cfgService = app.get(ConfigService);
  await app.listen(cfgService.get('PORT'));
}
bootstrap();
