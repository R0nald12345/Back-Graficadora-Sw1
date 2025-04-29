import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { UsuarioProyectoModule } from './usuario-proyecto/usuario-proyecto.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MessageWsModule } from './message-ws/message-ws.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    //forRoot Se utliza en el modulo principal de la aplicacion manera general
    //forFeature en modulos Internos
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService], //me permite agregar el inyectar osea acceder al archivo de typeOrmConfig
    }),
    // Módulo para tareas programadas (necesario para limpiar conexiones websocket)
    ScheduleModule.forRoot(),

    UsuarioModule,
    ProyectoModule,
    UsuarioProyectoModule,
    AuthModule,
    MessageWsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

//PAra iniciar el proyecto, primero crear la base de datos en postgres y luego ejecutar el siguiente comando:
// npm run start:dev