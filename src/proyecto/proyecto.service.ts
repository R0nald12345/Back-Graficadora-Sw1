import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
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
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  // Crear un nuevo proyecto y asignarlo a un usuario
  async create(createProyectoDto: CreateProyectoDto, usuarioId: number): Promise<Proyecto> {
    // Verificar si existe el usuario
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    // Crear y guardar el proyecto
    const proyecto = this.proyectoRepository.create(createProyectoDto);
    const proyectoGuardado = await this.proyectoRepository.save(proyecto);

    // Crear la relación usuario-proyecto
    await this.usuarioProyectoRepository.save({
      usuario,
      proyecto: proyectoGuardado,
      rol: 'ADMIN' // Role por defecto para el creador
    });

    return proyectoGuardado;
  }

  // Obtener todos los proyectos con sus relaciones
  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
      relations: ['usuarioProyectos', 'usuarioProyectos.usuario']
    });
  }

  // Buscar un proyecto específico por ID
  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['usuarioProyectos', 'usuarioProyectos.usuario']
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }
    return proyecto;
  }

  // Actualizar un proyecto existente
  async update(id: number, updateProyectoDto: UpdateProyectoDto, usuarioId: number): Promise<Proyecto> {
    // Buscar el proyecto con sus relaciones
    const proyecto = await this.findOne(id);
  
    // Verificar si el usuario es ADMIN del proyecto
    const esAdmin = proyecto.usuarioProyectos.some(
      up => up.usuario.id === usuarioId && up.rol === 'ADMIN'
    );
  
    if (!esAdmin) {
      throw new UnauthorizedException('Solo el administrador puede modificar el proyecto');
    }
  
    // Actualizar el proyecto
    this.proyectoRepository.merge(proyecto, updateProyectoDto);
    return await this.proyectoRepository.save(proyecto);
  }

  // Eliminar un proyecto y sus relaciones (en cascada)
  // Eliminar un proyecto y sus relaciones (en cascada)
  async remove(id: number, usuarioId: number): Promise<{ message: string }> {
    // Buscar el proyecto con sus relaciones
    const proyecto = await this.findOne(id);

    // Verificar si el usuario es ADMIN del proyecto
    const esAdmin = proyecto.usuarioProyectos.some(
      up => up.usuario.id === usuarioId && up.rol === 'ADMIN'
    );

    if (!esAdmin) {
      throw new UnauthorizedException('Solo el administrador puede eliminar el proyecto');
    }

    // Eliminar el proyecto
    await this.proyectoRepository.remove(proyecto);

    return {
      message: `Proyecto "${proyecto.nombre}" eliminado correctamente`
    };
  }

  // Obtener proyectos de un usuario específico
  async findByUsuarioId(usuarioId: number): Promise<Proyecto[]> {
    return await this.proyectoRepository
      .createQueryBuilder('proyecto')
      .innerJoinAndSelect('proyecto.usuarioProyectos', 'usuarioProyecto')
      .innerJoinAndSelect('usuarioProyecto.usuario', 'usuario')
      .where('usuario.id = :usuarioId', { usuarioId })
      .getMany();
  }

  // Obtener proyectos donde el usuario es ADMIN
  async findProyectosAsAdmin(usuarioId: number): Promise<Proyecto[]> {
    return await this.proyectoRepository
      .createQueryBuilder('proyecto')
      .innerJoinAndSelect('proyecto.usuarioProyectos', 'usuarioProyecto')
      .innerJoinAndSelect('usuarioProyecto.usuario', 'usuario')
      .where('usuario.id = :usuarioId', { usuarioId })
      .andWhere('usuarioProyecto.rol = :rol', { rol: 'ADMIN' })
      .getMany();
  }

    // Obtener proyectos donde el usuario es INVITADO
    async findProyectosAsInvitado(usuarioId: number): Promise<Proyecto[]> {
      return await this.proyectoRepository
        .createQueryBuilder('proyecto')
        .innerJoinAndSelect('proyecto.usuarioProyectos', 'usuarioProyecto')
        .innerJoinAndSelect('usuarioProyecto.usuario', 'usuario')
        .where('usuario.id = :usuarioId', { usuarioId })
        .andWhere('usuarioProyecto.rol = :rol', { rol: 'INVITADO' })
        .getMany();
    }


      // Agregar un usuario invitado al proyecto
  async agregarInvitado(proyectoId: number, invitadoId: number, adminId: number): Promise<{ message: string }> {
    // 1. Verificar si existe el proyecto
    const proyecto = await this.findOne(proyectoId);

    // 2. Verificar si el usuario que hace la petición es ADMIN
    const esAdmin = proyecto.usuarioProyectos.some(
      up => up.usuario.id === adminId && up.rol === 'ADMIN'
    );

    if (!esAdmin) {
      throw new UnauthorizedException('Solo el administrador puede agregar invitados');
    }

    // 3. Verificar si existe el usuario a invitar
    const invitado = await this.usuarioRepository.findOneBy({ id: invitadoId });
    if (!invitado) {
      throw new NotFoundException(`Usuario invitado con ID ${invitadoId} no encontrado`);
    }

    // 4. Verificar si el usuario ya está en el proyecto
    const yaExisteRelacion = await this.usuarioProyectoRepository.findOne({
      where: {
        usuario: { id: invitadoId },
        proyecto: { id: proyectoId }
      }
    });

    if (yaExisteRelacion) {
      throw new UnauthorizedException('El usuario ya está asociado a este proyecto');
    }

    // 5. Crear la relación usuario-proyecto como INVITADO
    await this.usuarioProyectoRepository.save({
      usuario: invitado,
      proyecto,
      rol: 'INVITADO'
    });

    return {
      message: `Usuario ${invitado.nombre} agregado como invitado al proyecto "${proyecto.nombre}"`
    };
  }
}