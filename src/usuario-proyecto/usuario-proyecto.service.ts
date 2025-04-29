import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioProyectoDto } from './dto/create-usuario-proyecto.dto';
import { UpdateUsuarioProyectoDto } from './dto/update-usuario-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioProyecto } from './entities/usuario-proyecto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

@Injectable()
export class UsuarioProyectoService {
  constructor(
    @InjectRepository(UsuarioProyecto)
    private readonly usuarioProyectoRepository: Repository<UsuarioProyecto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async create(createUsuarioProyectoDto: CreateUsuarioProyectoDto) {
    const { usuarioId, proyectoId, rol } = createUsuarioProyectoDto;

    // Verificar si existe el usuario y proyecto
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const proyecto = await this.proyectoRepository.findOneBy({ id: proyectoId });

    if (!usuario || !proyecto) {
      throw new NotFoundException('Usuario o Proyecto no encontrado');
    }

    // Verificar si ya existe la relación
    const existingRelation = await this.usuarioProyectoRepository.findOne({
      where: { usuario: { id: usuarioId }, proyecto: { id: proyectoId } }
    });

    if (existingRelation) {
      throw new Error('El usuario ya está asociado a este proyecto');
    }

    const usuarioProyecto = this.usuarioProyectoRepository.create({
      usuario,
      proyecto,
      rol
    });

    return await this.usuarioProyectoRepository.save(usuarioProyecto);
  }

  async findAll() {
    return await this.usuarioProyectoRepository.find({
      relations: ['usuario', 'proyecto']
    });
  }

  async findOne(id: number) {
    const relation = await this.usuarioProyectoRepository.findOne({
      where: { id },
      relations: ['usuario', 'proyecto']
    });

    if (!relation) {
      throw new NotFoundException('Relación no encontrada');
    }

    return relation;
  }

  async update(id: number, updateUsuarioProyectoDto: UpdateUsuarioProyectoDto) {
    const relation = await this.findOne(id);
    this.usuarioProyectoRepository.merge(relation, updateUsuarioProyectoDto);
    return await this.usuarioProyectoRepository.save(relation);
  }

  async remove(id: number) {
    const relation = await this.findOne(id);
    await this.usuarioProyectoRepository.remove(relation);
  }
}