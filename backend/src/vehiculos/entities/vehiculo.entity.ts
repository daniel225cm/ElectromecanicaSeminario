import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 10 })
  placa!: string;

  @Column({ length: 50 })
  marca!: string;

  @Column({ length: 50 })
  modelo!: string;

  @Column()
  anio!: number;

  @ManyToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
  cliente!: Cliente;
}
