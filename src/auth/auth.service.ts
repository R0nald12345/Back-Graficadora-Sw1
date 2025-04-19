import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;

    // Generar hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con la contraseña hasheada
    const createdUser = await this.usuarioService.create({
      ...userData,
      password: hashedPassword,
    });

    // Eliminar la contraseña de la respuesta
    const { password: _, ...user } = createdUser;

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  //Metodo para logearse
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuarios por email
    const usuarios = await this.usuarioService.findAll();
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      throw new NotFoundException('Credenciales inválidas');
    }

    // Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Credenciales inválidas');
    }

    // Eliminar la contraseña de la respuesta
    const { password: _, ...user } = usuario;

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  //Genera mi JWT a partir de mi payload osea ID
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  //Valida si el usuario existe

  async validateUser(id: number) {
    return await this.usuarioService.findOne(id);
  }
}
