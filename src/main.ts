import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ FIX: Allow both ports
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:49668'
    ],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 NestJS running on http://localhost:3000');
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});
