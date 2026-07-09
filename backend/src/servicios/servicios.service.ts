import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Servicio } from './entities/servicio.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviciosRepository: Repository<Servicio>,

    @InjectRepository(Vehiculo)
    private readonly vehiculosRepository: Repository<Vehiculo>,
  ) {}

  findAll() {
    return this.serviciosRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const servicio = await this.serviciosRepository.findOne({
      where: { id },
    });

    if (!servicio) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return servicio;
  }

  async create(createServicioDto: CreateServicioDto) {
    const vehiculo = await this.vehiculosRepository.findOne({
      where: { id: createServicioDto.vehiculoId },
    });

    if (!vehiculo) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    const servicio = this.serviciosRepository.create({
      tipo: createServicioDto.tipo,
      descripcion: createServicioDto.descripcion,
      fecha: createServicioDto.fecha,
      costo: createServicioDto.costo,
      estado: createServicioDto.estado,
      vehiculo,
    });

    return this.serviciosRepository.save(servicio);
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.findOne(id);

    if (updateServicioDto.vehiculoId) {
      const vehiculo = await this.vehiculosRepository.findOne({
        where: { id: updateServicioDto.vehiculoId },
      });

      if (!vehiculo) {
        throw new NotFoundException('Vehículo no encontrado');
      }

      servicio.vehiculo = vehiculo;
    }

    Object.assign(servicio, {
      tipo: updateServicioDto.tipo ?? servicio.tipo,
      descripcion: updateServicioDto.descripcion ?? servicio.descripcion,
      fecha: updateServicioDto.fecha ?? servicio.fecha,
      costo: updateServicioDto.costo ?? servicio.costo,
      estado: updateServicioDto.estado ?? servicio.estado,
    });

    return this.serviciosRepository.save(servicio);
  }

  async remove(id: number) {
    const servicio = await this.findOne(id);
    await this.serviciosRepository.remove(servicio);

    return {
      message: 'Servicio eliminado correctamente',
    };
  }
}
