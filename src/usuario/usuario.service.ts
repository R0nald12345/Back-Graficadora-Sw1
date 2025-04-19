import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuarioService {


  //ReadOnly me indica que solamente uso lo metodos que hayan sido creados en el constructor
  constructor( 
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>
  ){}
  

  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new Usuario();
    usuario.nombre = createUsuarioDto.nombre;
    usuario.email = createUsuarioDto.email;
    usuario.password = createUsuarioDto.password;
    
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return  this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario =await this.usuarioRepository.findOneBy({id});
    if(!usuario) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return  usuario;
    
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const usuario = await this.findOne(id);
    usuario.email = updateUsuarioDto.email;
    usuario.password = updateUsuarioDto.password;
    usuario.nombre = updateUsuarioDto.nombre;
    return await this.usuarioRepository.save(usuario);
  }

  //remove eliminar la entidad eliminada
  //delete me muestra la lista de datos que se actualizaron luego se eliminados

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return await this.usuarioRepository.delete(usuario);

  }
}
