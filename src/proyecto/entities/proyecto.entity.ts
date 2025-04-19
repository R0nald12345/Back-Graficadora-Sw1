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
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creado: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    actualizado: Date;

    @OneToMany(
        ()=>UsuarioProyecto,
        UsuarioProyecto => UsuarioProyecto.proyecto
    )
    usuarioProyectos:UsuarioProyecto[];

    // @OneToMany(()=> UsuarioProyecto,   )
}
