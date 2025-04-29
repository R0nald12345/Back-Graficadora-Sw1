import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Proyecto } from "../../proyecto/entities/proyecto.entity";

@Entity()
export class UsuarioProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

   // Relación con Usuario
  @ManyToOne(
    () => Usuario,
    usuario => usuario.usuarioProyectos,
    { onDelete: 'CASCADE' } // <-- Aquí
  )
  usuario: Usuario;

  // Relación con Proyecto
  @ManyToOne(
    () => Proyecto,
    proyecto => proyecto.usuarioProyectos,
    { onDelete: 'CASCADE' } // <-- Y aquí
  )
  proyecto: Proyecto;
}
