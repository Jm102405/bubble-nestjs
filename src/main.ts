import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ Enable CORS for all origins (dev mode)
  app.enableCors({
    origin: true,        // allows all origins (dev only - for production, specify exact origins)
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 NestJS running on http://localhost:3000');
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});
