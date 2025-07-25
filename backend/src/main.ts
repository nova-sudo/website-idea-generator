import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the Next.js frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  });

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();