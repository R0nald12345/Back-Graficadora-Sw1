import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioProyectoService } from './usuario-proyecto.service';
import { CreateUsuarioProyectoDto } from './dto/create-usuario-proyecto.dto';
import { UpdateUsuarioProyectoDto } from './dto/update-usuario-proyecto.dto';

@Controller('usuario-proyecto')
export class UsuarioProyectoController {
  constructor(private readonly usuarioProyectoService: UsuarioProyectoService) {}

  @Post()
  create(@Body() createUsuarioProyectoDto: CreateUsuarioProyectoDto) {
    return this.usuarioProyectoService.create(createUsuarioProyectoDto);
  }

  @Get()
  findAll() {
    return this.usuarioProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioProyectoDto: UpdateUsuarioProyectoDto) {
    return this.usuarioProyectoService.update(+id, updateUsuarioProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioProyectoService.remove(+id);
  }
}
