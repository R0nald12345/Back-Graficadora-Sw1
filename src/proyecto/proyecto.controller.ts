import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';


@Controller('proyecto')
@UseGuards(JwtAuthGuard) // Protege todas las rutas
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) { }

  // Crear nuevo proyecto
  @Post()
  create(
    @GetUser('id') usuarioId: number,
    @Body() createProyectoDto: CreateProyectoDto
  ) {
    return this.proyectoService.create(createProyectoDto, usuarioId);
  }

  // Obtener todos los proyectos
  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  // Obtener proyecto por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proyectoService.findOne(id);
  }

  // Obtener proyectos de un usuario específico
  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.proyectoService.findByUsuarioId(usuarioId);
  }

  // Actualizar proyecto
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProyectoDto: UpdateProyectoDto,
    @GetUser('id') usuarioId: number
  ) {
    return this.proyectoService.update(id, updateProyectoDto, usuarioId);
  }

  // Eliminar proyecto
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') usuarioId: number
  ) {
    return this.proyectoService.remove(id, usuarioId);
  }


  @Get('mis-proyectos/admin')
  findProyectosAsAdmin(@GetUser('id') usuarioId: number) {
    return this.proyectoService.findProyectosAsAdmin(usuarioId);
  }

  @Get('mis-proyectos/invitado')
  findProyectosAsInvitado(@GetUser('id') usuarioId: number) {
    return this.proyectoService.findProyectosAsInvitado(usuarioId);
  }

  @Post(':id/invitar')
  agregarInvitado(
    @Param('id', ParseIntPipe) proyectoId: number,
    @Body('invitadoId', ParseIntPipe) invitadoId: number,
    @GetUser('id') adminId: number
  ) {
    return this.proyectoService.agregarInvitado(proyectoId, invitadoId, adminId);
  }
  
}