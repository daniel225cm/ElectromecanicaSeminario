import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class Clientes {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/clientes';

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api);
  }

  crear(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, cliente);
  }

  actualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.api}/${id}`, cliente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}