
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {

    @IsEmail({}, {message:'El email no es válido'})
    @IsNotEmpty({message:'El email no puede estar vacío'})
    email: string; 

    @IsString()
    @IsNotEmpty({message:'La contraseña no puede estar vacía'})
    password: string;
    
    @IsString() 
    @IsNotEmpty({message:' El nombre de Usuario no puede estar vacío'})
    nombre: string;
 
}
