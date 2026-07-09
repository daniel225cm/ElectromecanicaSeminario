import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class Servicios {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/servicios';

  listar(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.api);
  }

  crear(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.api, servicio);
  }

  actualizar(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.api}/${id}`, servicio);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}