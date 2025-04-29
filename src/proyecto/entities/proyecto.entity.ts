import { UsuarioProyecto } from "src/usuario-proyecto/entities/usuario-proyecto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  

    // Relación con UsuarioProyecto
    @OneToMany(
        ()=>UsuarioProyecto,
        usuarioProyecto => usuarioProyecto.proyecto
    )
    usuarioProyectos:UsuarioProyecto[];


}
