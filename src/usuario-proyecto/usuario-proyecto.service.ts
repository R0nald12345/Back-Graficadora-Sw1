import { Injectable } from '@nestjs/common';
import { CreateUsuarioProyectoDto } from './dto/create-usuario-proyecto.dto';
import { UpdateUsuarioProyectoDto } from './dto/update-usuario-proyecto.dto';

@Injectable()
export class UsuarioProyectoService {
  create(createUsuarioProyectoDto: CreateUsuarioProyectoDto) {
    return 'This action adds a new usuarioProyecto';
  }

  findAll() {
    return `This action returns all usuarioProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioProyecto`;
  }

  update(id: number, updateUsuarioProyectoDto: UpdateUsuarioProyectoDto) {
    return `This action updates a #${id} usuarioProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioProyecto`;
  }
}
