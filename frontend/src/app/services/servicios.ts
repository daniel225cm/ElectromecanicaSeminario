import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class Servicios {
  private http = inject(HttpClient);
  private apiUrl = 'https://electromecanica-backend.onrender.com/servicios';

  listar(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  crear(servicio: Servicio): Observable<Servicio> {
    const data = {
      tipo: servicio.tipo,
      descripcion: servicio.descripcion,
      fecha: servicio.fecha,
      costo: Number(servicio.costo),
      estado: servicio.estado,
      vehiculoId: Number(servicio.vehiculoId),
    };

    return this.http.post<Servicio>(this.apiUrl, data);
  }

  actualizar(id: number, servicio: Servicio): Observable<Servicio> {
    const data = {
      tipo: servicio.tipo,
      descripcion: servicio.descripcion,
      fecha: servicio.fecha,
      costo: Number(servicio.costo),
      estado: servicio.estado,
      vehiculoId: Number(servicio.vehiculoId),
    };

    return this.http.patch<Servicio>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
