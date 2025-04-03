import { Module } from '@nestjs/common';
import { UsuarioProyectoService } from './usuario-proyecto.service';
import { UsuarioProyectoController } from './usuario-proyecto.controller';

@Module({
  controllers: [UsuarioProyectoController],
  providers: [UsuarioProyectoService],
})
export class UsuarioProyectoModule {}
