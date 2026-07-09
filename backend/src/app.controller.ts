import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  inicio() {
    return {
      mensaje: 'API Electromecánica Seminario funcionando correctamente',
      estado: 'OK',
      version: '1.0.0',
      sistema: 'Sistema de Gestión de Taller Electromecánico',
      modulos: ['Usuarios', 'Clientes', 'Vehículos', 'Servicios'],
      documentacion: 'https://electromecanica-backend.onrender.com/api',
      frontend: 'https://electromecanica-frontend.onrender.com',
    };
  }
}
