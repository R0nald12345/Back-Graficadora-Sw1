import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración de CORS
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  // Configuración para uso de DTOs y validación de datos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // Elimina propiedades que no están en el DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();