
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioProyectoDto {
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
  
    @IsNotEmpty()
    @IsNumber()
    proyectoId: number;
  
    @IsNotEmpty()
    @IsString()
    rol: string;
  
}
