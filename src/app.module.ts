import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { InvitacionModule } from './invitacion/invitacion.module';
import { UsuarioProyectoModule } from './usuario-proyecto/usuario-proyecto.module';
import { CanvaModule } from './canva/canva.module';
import { ElementoModule } from './elemento/elemento.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {typeOrmConfig} from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:typeOrmConfig,
      inject:[ConfigService],
    }),
    UsuarioModule,
    ProyectoModule,
    InvitacionModule,
    UsuarioProyectoModule,
    CanvaModule,
    ElementoModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//PAra iniciar el proyecto, primero crear la base de datos en postgres y luego ejecutar el siguiente comando:
// npm run start:dev