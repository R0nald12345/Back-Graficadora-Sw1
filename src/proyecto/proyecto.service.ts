import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { read } from 'fs';
import { Repository } from 'typeorm';
import { UsuarioProyecto } from 'src/usuario-proyecto/entities/usuario-proyecto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(UsuarioProyecto)
    private readonly usuarioProyectoRepository: Repository<UsuarioProyecto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}


  async create(createProyectoDto: CreateProyectoDto, usuarioId: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(`El usuario con el id ${usuarioId} no existe`);
    }
  
    const proyecto = new Proyecto();
    proyecto.nombre = createProyectoDto.nombre;
    proyecto.descripcion = createProyectoDto.descripcion;
    proyecto.creado = new Date();
    proyecto.actualizado = new Date();
  
    // Guardamos el proyecto en la base de datos
    const proyectoGuardado = await this.proyectoRepository.save(proyecto);
  
    // Crear relación usuario-proyecto con rol de propietario
    const usuarioProyecto = this.usuarioProyectoRepository.create({
      usuario,
      proyecto: proyectoGuardado,
      rol: 'propietario',
    });
    await this.usuarioProyectoRepository.save(usuarioProyecto);
  
    return proyectoGuardado;
  }

  findAll() {
    return this.proyectoRepository.find({
      relations: ['usuarioProyectos', 'usuarioProyectos.usuario'],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} proyecto`;
  // }

  // update(id: number, updateProyectoDto: UpdateProyectoDto) {
  //   return `This action updates a #${id} proyecto`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} proyecto`;
  // }
}
