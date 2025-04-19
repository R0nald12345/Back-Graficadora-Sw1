import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(
    private readonly proyectoService: ProyectoService

  ) {}

  @Post(':usuarioId')
  create(
    @Param('usuarioId') usuarioId: number,
    @Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto, usuarioId);
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.proyectoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
  //   return this.proyectoService.update(+id, updateProyectoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.proyectoService.remove(+id);
  // }
}
