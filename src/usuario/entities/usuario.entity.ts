import { UsuarioProyecto } from "src/usuario-proyecto/entities/usuario-proyecto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


//estamos usando la forma de Datamaper
@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true, type:'varchar',length:50})
    email:string;

    @Column()
    password:string;

    @Column()
    nombre:string;

    // Relación con UsuarioProyecto
    @OneToMany( 
        ()=> UsuarioProyecto, 
        usuarioProyecto => usuarioProyecto.usuario
    )
    usuarioProyectos: UsuarioProyecto[]

    
    
}