import { NestFactory } from '@nestjs/core'; // NestJS core factory
import { AppModule } from './app.module'; // Root module

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create app instance
  
  // ✅ FIX: Enable CORS for specific origins
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:49668'
    ],
    credentials: true,
  });
  
  await app.listen(3000); // Start server
  console.log('🚀 NestJS running on http://localhost:3000'); // Log server start
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err); // Log bootstrap errors
});
