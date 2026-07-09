import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly api = 'http://localhost:3000';

  private esNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(correo: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, {
      correo,
      password,
    });
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.api}/usuarios`, usuario);
  }

  guardarSesion(token: string, usuario: Usuario): void {
    if (!this.esNavegador()) return;

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerToken(): string | null {
    if (!this.esNavegador()) return null;
    return localStorage.getItem('token');
  }

  obtenerUsuario(): Usuario | null {
    if (!this.esNavegador()) return null;

    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {
    if (!this.esNavegador()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
