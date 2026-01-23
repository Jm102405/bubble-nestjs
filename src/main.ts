// main.ts - FULL CODE WITH BODY SIZE LIMIT
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express'; // ✅ ADD THIS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ NEW: Increase payload size limit to 10MB (for image uploads)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  
  const configService = app.get(ConfigService);
  
  // ✅ Enable CORS with origin from .env
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || true,
    credentials: true,
  });
  
  const port = configService.get<number>('PORT') || 3000;
  
  await app.listen(port);
  console.log(`🚀 NestJS running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});
