// src/main.ts - FULL OPTIMIZED CODE (MEMORY FIX)
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
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  
  // ✅ Minimal logging (prevent memory issues)
  console.log('🔍 CORS enabled for:', corsOrigin || 'ALL ORIGINS');
  
  // ✅ Enable CORS with origin from .env
  app.enableCors({
    origin: corsOrigin || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = configService.get<number>('PORT') || 3000;
  
  await app.listen(port);
  console.log(`🚀 NestJS running on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('❌ Error starting application:', err);
});
