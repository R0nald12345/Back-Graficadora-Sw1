import { Module } from '@nestjs/common';
import { UsuarioProyectoService } from './usuario-proyecto.service';
import { UsuarioProyectoController } from './usuario-proyecto.controller';
import { UsuarioProyecto } from './entities/usuario-proyecto.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioProyecto, Usuario, Proyecto])
  ],
  controllers: [UsuarioProyectoController],
  providers: [UsuarioProyectoService],
  exports: [UsuarioProyectoService]
})
export class UsuarioProyectoModule {}