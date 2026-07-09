import { Cliente } from './cliente.model';

export interface Vehiculo {
  id?: number;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  cliente?: Cliente;
  clienteId?: number;
}