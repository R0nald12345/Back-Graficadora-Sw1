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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //forRoot Se utliza en el modulo principal de la aplicacion manera general
    //forFeature en modulos Internos
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:typeOrmConfig,
      inject:[ConfigService], //me permite agregar el inyectar osea acceder al archivo de typeOrmConfig
    }),
    UsuarioModule,
    ProyectoModule,
    InvitacionModule,
    UsuarioProyectoModule,
    CanvaModule,
    ElementoModule,
    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//PAra iniciar el proyecto, primero crear la base de datos en postgres y luego ejecutar el siguiente comando:
// npm run start:dev