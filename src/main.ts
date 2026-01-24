// src/main.ts - ULTRA MINIMAL
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  
  const configService = app.get(ConfigService);
  
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || true,
    credentials: true,
  });
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error:', err);
});
