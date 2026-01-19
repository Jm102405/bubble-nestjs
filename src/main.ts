import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'; // ✅ Import ConfigService
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService); // ✅ Get ConfigService instance
  
  // ✅ Enable CORS with origin from .env
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || true, // Use .env or allow all
    credentials: true,
  });
  
  const port = configService.get<number>('PORT') || 3000; // ✅ Get PORT from .env
  
  await app.listen(port);
  console.log(`🚀 NestJS running on http://localhost:${port}`); // ✅ Dynamic port
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});
