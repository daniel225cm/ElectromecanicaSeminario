import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { Auth } from '../../services/auth';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  usuario: Usuario = {
    nombre: '',
    correo: '',
    password: '',
    rol: 'ADMIN',
  };

  registrar(): void {
    if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.password) {
      Swal.fire('Campos incompletos', 'Complete todos los datos.', 'warning');
      return;
    }

    this.auth.registrar(this.usuario).subscribe({
      next: () => {
        Swal.fire('Usuario creado', 'Ahora puede iniciar sesión.', 'success');
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
      },
    });
  }
}