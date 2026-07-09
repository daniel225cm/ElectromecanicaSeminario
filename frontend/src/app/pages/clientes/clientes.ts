import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { Cliente } from '../../models/cliente.model';
import { Clientes as ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  private clientesService = inject(ClientesService);
  private cdr = inject(ChangeDetectorRef);

  clientes: Cliente[] = [];
  busqueda = '';
  editando = false;

  cliente: Cliente = {
    nombre: '',
    cedula: '',
    telefono: '',
    correo: '',
  };

  ngOnInit(): void {
    this.cargarClientes();
  }

  get clientesFiltrados(): Cliente[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.clientes.filter((c) =>
      `${c.nombre} ${c.cedula} ${c.telefono} ${c.correo}`
        .toLowerCase()
        .includes(texto),
    );
  }

  cargarClientes(): void {
    this.clientesService.listar().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.busqueda = '';
        this.cdr.detectChanges();
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los clientes.', 'error'),
    });
  }

  nuevoCliente(): void {
    this.editando = false;
    this.cliente = {
      nombre: '',
      cedula: '',
      telefono: '',
      correo: '',
    };
  }

  editarCliente(cliente: Cliente): void {
    this.editando = true;
    this.cliente = { ...cliente };
  }

  guardarCliente(): void {
    if (!this.cliente.nombre || !this.cliente.cedula || !this.cliente.telefono || !this.cliente.correo) {
      Swal.fire('Campos incompletos', 'Complete todos los datos.', 'warning');
      return;
    }

    if (this.editando && this.cliente.id) {
      this.clientesService.actualizar(this.cliente.id, this.cliente).subscribe({
        next: () => {
          this.cargarClientes();
          Swal.fire('Actualizado', 'Cliente actualizado correctamente.', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error'),
      });
      return;
    }

    this.clientesService.crear(this.cliente).subscribe({
      next: () => {
        this.cargarClientes();
        Swal.fire('Registrado', 'Cliente creado correctamente.', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo crear el cliente.', 'error'),
    });
  }

  eliminarCliente(id: number): void {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: 'Esta acción también puede afectar vehículos relacionados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.eliminar(id).subscribe({
          next: () => {
            this.clientes = this.clientes.filter((c) => c.id !== id);
            this.busqueda = '';
            this.cdr.detectChanges();
            Swal.fire('Eliminado', 'Cliente eliminado correctamente.', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error'),
        });
      }
    });
  }
}