import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  tipo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo!: number;

  @Column({ length: 30, default: 'Pendiente' })
  estado!: string;

  @ManyToOne(() => Vehiculo, { eager: true, onDelete: 'CASCADE' })
  vehiculo!: Vehiculo;
}
