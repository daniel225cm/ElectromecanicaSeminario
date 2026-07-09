import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class Vehiculos {
  private http = inject(HttpClient);
  private apiUrl = 'https://electromecanica-backend.onrender.com/vehiculos';

  listar(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  crear(vehiculo: Vehiculo): Observable<Vehiculo> {
    const data = {
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: Number(vehiculo.anio),
      clienteId: Number(vehiculo.clienteId),
    };

    return this.http.post<Vehiculo>(this.apiUrl, data);
  }

  actualizar(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    const data = {
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: Number(vehiculo.anio),
      clienteId: Number(vehiculo.clienteId),
    };

    return this.http.patch<Vehiculo>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
