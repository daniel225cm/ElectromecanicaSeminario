import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    const existeAdmin = await this.usuariosRepository.findOne({
      where: {
        correo: 'admin@seminario.com',
      },
    });

    if (!existeAdmin) {
      const administrador = this.usuariosRepository.create({
        nombre: 'Administrador',
        correo: 'admin@seminario.com',
        password: 'Admin123*',
        rol: 'ADMIN',
      });

      await this.usuariosRepository.save(administrador);

      console.log('Usuario administrador creado correctamente.');
    }
  }
}
