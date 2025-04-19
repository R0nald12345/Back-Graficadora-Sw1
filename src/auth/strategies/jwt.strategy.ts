import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";


// Decorador que indica que esta clase es un servicio que se puede inyectar en otras clases
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Constructor que recibe dos parámetros: authService y configService
  constructor(
    // Servicio de autenticación que se utiliza para validar al usuario
    private readonly authService: AuthService,
    // Servicio de configuración que se utiliza para obtener la clave secreta del token JWT
    configService: ConfigService,
  ) {
    // Llama al constructor de la clase padre (PassportStrategy) con una configuración específica
    super({
      // Función que se utiliza para extraer el token JWT de la solicitud
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Indica si se debe ignorar la fecha de expiración del token JWT
      ignoreExpiration: false,
      // Clave secreta que se utiliza para firmar y verificar el token JWT
      secretOrKey: configService.get('JWT_SECRET') || 'tu_clave_secreta_aqui',
    });
  }

  // Método que se llama cuando se recibe un token JWT en la solicitud
  async validate(payload: JwtPayload) {
    // Extrae el ID del usuario del payload del token JWT
    const { id } = payload;
    // Llama al servicio de autenticación para validar al usuario con el ID proporcionado
    const user = await this.authService.validateUser(id);

    // Si no se encuentra al usuario, lanza una excepción
    if (!user) {
      throw new NotFoundException('Token no válido');
    }

    // Devuelve el usuario validado
    return user;
  }
}