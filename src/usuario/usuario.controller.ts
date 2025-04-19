import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IdValidationPipe } from 'src/common/pipes/pipes.pipe';

@Controller('usuario')
export class UsuarioController {

  constructor(
    private readonly usuarioService: UsuarioService) 
  {}


  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }


  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  //Para los Pipe una opcion es colocar esto "ParseIntPipe"
    //findOne(@Param('id', ParseIntPipe) id: string) {
  //Si quremos personalizarlo seria de la siguiente manera
    //findOne(@Param('id', new ParseIntPipe({exceptionFactory:()=> new BadRequestException ('El id debe ser numerico')})) id: string) {
  //O sino creamos nuestro propio PIPE en la carpeta common
  @Get(':id', )
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.usuarioService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }


  @Delete(':id')
  remove(@Param('id',IdValidationPipe) id: string) {
    return this.usuarioService.remove(+id);
  }
}
