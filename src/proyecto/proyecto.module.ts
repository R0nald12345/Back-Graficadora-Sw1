import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { UsuarioProyecto } from 'src/usuario-proyecto/entities/usuario-proyecto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, UsuarioProyecto, Usuario])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService]
})
export class ProyectoModule {}
