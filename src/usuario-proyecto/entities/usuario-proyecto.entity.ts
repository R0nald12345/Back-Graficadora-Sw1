import { Column, PrimaryGeneratedColumn,JoinColumn,ManyToOne } from "typeorm";
import {Usuario} from "../../usuario/entities/usuario.entity";
import {Proyecto} from "../../proyecto/entities/proyecto.entity";

export class UsuarioProyecto {
    // @PrimaryGeneratedColumn()
    // id: number;

    // @Column()
    // rol:string;

    // @ManyToOne(() => Usuario, usuario => usuario.usuarioProyectos)
    // @JoinColumn()
    // usuario: Usuario;

    // @ManyToOne(() => Proyecto, proyecto => proyecto.usuarioProyectos)
    // @JoinColumn()
    // proyecto: Proyecto;


}
