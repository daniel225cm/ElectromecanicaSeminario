import { Vehiculo } from './vehiculo.model';

export interface Servicio {
  id?: number;
  tipo: string;
  descripcion: string;
  fecha: string;
  costo: number;
  estado: string;
  vehiculo?: Vehiculo;
  vehiculoId?: number;
}
