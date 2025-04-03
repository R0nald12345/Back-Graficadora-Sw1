
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {

    @IsString() 
    @IsNotEmpty({message:' El nombre de Usuario no puede estar vacío'})
    name: string;

}
