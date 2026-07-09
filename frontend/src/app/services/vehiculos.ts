import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class Vehiculos {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/vehiculos';

  listar(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.api);
  }

  crear(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.api, vehiculo);
  }

  actualizar(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.patch<Vehiculo>(`${this.api}/${id}`, vehiculo);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}