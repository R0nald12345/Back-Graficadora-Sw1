import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioProyectoDto } from './create-usuario-proyecto.dto';

export class UpdateUsuarioProyectoDto extends PartialType(CreateUsuarioProyectoDto) {}
