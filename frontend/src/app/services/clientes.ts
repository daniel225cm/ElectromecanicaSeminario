import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class Clientes {
  private http = inject(HttpClient);
  private apiUrl = 'https://electromecanica-backend.onrender.com/clientes';

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crear(cliente: Cliente): Observable<Cliente> {
    const data = {
      nombre: cliente.nombre,
      cedula: cliente.cedula,
      telefono: cliente.telefono,
      correo: cliente.correo,
    };

    return this.http.post<Cliente>(this.apiUrl, data);
  }

  actualizar(id: number, cliente: Cliente): Observable<Cliente> {
    const data = {
      nombre: cliente.nombre,
      cedula: cliente.cedula,
      telefono: cliente.telefono,
      correo: cliente.correo,
    };

    return this.http.patch<Cliente>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
