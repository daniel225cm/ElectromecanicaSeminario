import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vehiculo } from './entities/vehiculo.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculosRepository: Repository<Vehiculo>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.vehiculosRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const vehiculo = await this.vehiculosRepository.findOne({
      where: { id },
    });

    if (!vehiculo) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    return vehiculo;
  }

  async create(createVehiculoDto: CreateVehiculoDto) {
    const cliente = await this.clientesRepository.findOne({
      where: { id: createVehiculoDto.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const vehiculo = this.vehiculosRepository.create({
      placa: createVehiculoDto.placa,
      marca: createVehiculoDto.marca,
      modelo: createVehiculoDto.modelo,
      anio: createVehiculoDto.anio,
      cliente,
    });

    return this.vehiculosRepository.save(vehiculo);
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);

    if (updateVehiculoDto.clienteId) {
      const cliente = await this.clientesRepository.findOne({
        where: { id: updateVehiculoDto.clienteId },
      });

      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }

      vehiculo.cliente = cliente;
    }

    Object.assign(vehiculo, {
      placa: updateVehiculoDto.placa ?? vehiculo.placa,
      marca: updateVehiculoDto.marca ?? vehiculo.marca,
      modelo: updateVehiculoDto.modelo ?? vehiculo.modelo,
      anio: updateVehiculoDto.anio ?? vehiculo.anio,
    });

    return this.vehiculosRepository.save(vehiculo);
  }

  async remove(id: number) {
    const vehiculo = await this.findOne(id);
    await this.vehiculosRepository.remove(vehiculo);

    return {
      message: 'Vehículo eliminado correctamente',
    };
  }
}
