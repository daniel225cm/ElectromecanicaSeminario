import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { Servicio } from './entities/servicio.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Vehiculo])],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}
