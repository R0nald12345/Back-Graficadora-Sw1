import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);


  // Configuración para uso de DTOs y validación de datos agreggo npm i class-validator class-transformer
  app.useGlobalPipes( new ValidationPipe({
    whitelist:true // Elimina propiedades que no están en el DTO
  }));
}
bootstrap();
