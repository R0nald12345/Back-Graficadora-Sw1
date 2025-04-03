import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    // @OneToMany(()=>UsuarioProyecto,  usuarioProyecto => usuarioProyecto.usuario )
    // usuarioProyectos: UsuarioProyecto[];

    // @OneToMany( ()=>Invitacion, invitacion => invitacion.usuario)
    // invitaciones: Invitacion[];
}