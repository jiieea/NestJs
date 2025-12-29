import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('secret-key'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('html', mustache());
  app.setViewEngine('mustache');
  const serviceConfig = app.get(ConfigService);
  await app.listen(serviceConfig.get('PORT') ?? 8000);
}
void bootstrap();
