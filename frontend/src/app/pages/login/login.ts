import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  correo = '';
  password = '';
  cargando = false;

  iniciarSesion(): void {
    if (!this.correo || !this.password) {
      Swal.fire('Campos incompletos', 'Ingrese correo y contraseña.', 'warning');
      return;
    }

    this.cargando = true;

    this.auth.login(this.correo, this.password).subscribe({
      next: (respuesta) => {
        this.auth.guardarSesion(respuesta.access_token, respuesta.usuario);
        this.cargando = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.cargando = false;
        Swal.fire('Acceso denegado', 'Correo o contraseña incorrectos.', 'error');
      },
    });
  }
}