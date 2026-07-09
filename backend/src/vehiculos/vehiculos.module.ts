import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';
import { Vehiculo } from './entities/vehiculo.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, Cliente])],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
