import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProyectoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsOptional()
    @IsString()
    descripcion: string
    
}
