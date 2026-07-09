import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ unique: true, length: 10 })
  cedula!: string;

  @Column({ length: 15 })
  telefono!: string;

  @Column({ unique: true, length: 100 })
  correo!: string;
}
