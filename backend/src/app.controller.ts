import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  inicio() {
    return {
      mensaje: 'API Electromecánica Seminario funcionando correctamente',
      estado: 'OK',
    };
  }
}
