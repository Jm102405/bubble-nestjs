// src/main.ts - FULL CODE WITH DEBUG LOGGING
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ Increase payload size limit to 10MB (for image uploads)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  
  const configService = app.get(ConfigService);
  
  // ✅ DEBUG: Log CORS_ORIGIN value
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  console.log('🔍 CORS_ORIGIN from env:', corsOrigin);
  console.log('🔍 ALL ENV VARS:', {
    NODE_ENV: configService.get('NODE_ENV'),
    PORT: configService.get('PORT'),
    CORS_ORIGIN: corsOrigin,
    JWT_SECRET: configService.get('JWT_SECRET') ? '***set***' : 'NOT SET',
    MONGODB_URI: configService.get('MONGODB_URI') ? '***set***' : 'NOT SET'
  });
  
  // ✅ Enable CORS with origin from .env
  app.enableCors({
    origin: corsOrigin || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = configService.get<number>('PORT') || 3000;
  
  await app.listen(port);
  console.log(`🚀 NestJS running on http://localhost:${port}`);
  console.log(`✅ CORS enabled for: ${corsOrigin || 'ALL ORIGINS'}`);
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});
