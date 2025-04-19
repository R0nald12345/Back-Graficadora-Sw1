import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Proyecto } from "../../proyecto/entities/proyecto.entity";

@Entity()
export class UsuarioProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.usuarioProyectos,
    { onDelete: 'CASCADE' } // <-- Aquí
  )
  usuario: Usuario;

  @ManyToOne(
    () => Proyecto,
    proyecto => proyecto.usuarioProyectos,
    { onDelete: 'CASCADE' } // <-- Y aquí
  )
  proyecto: Proyecto;
}
