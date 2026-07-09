import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { Cliente } from '../../models/cliente.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { Clientes } from '../../services/clientes';
import { Vehiculos as VehiculosService } from '../../services/vehiculos';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css',
})
export class Vehiculos implements OnInit {
  private vehiculosService = inject(VehiculosService);
  private clientesService = inject(Clientes);
  private cdr = inject(ChangeDetectorRef);

  vehiculos: Vehiculo[] = [];
  clientes: Cliente[] = [];
  busqueda = '';
  editando = false;

  vehiculo: Vehiculo = {
    placa: '',
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    clienteId: 0,
  };

  ngOnInit(): void {
    this.cargarVehiculos();
    this.cargarClientes();
  }

  get vehiculosFiltrados(): Vehiculo[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.vehiculos.filter((v) =>
      `${v.placa} ${v.marca} ${v.modelo} ${v.anio} ${v.cliente?.nombre || ''}`
        .toLowerCase()
        .includes(texto),
    );
  }

  cargarVehiculos(): void {
    this.vehiculosService.listar().subscribe({
      next: (data) => {
        this.vehiculos = [...data];
        this.busqueda = '';
        this.cdr.detectChanges();
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los vehículos.', 'error'),
    });
  }

  cargarClientes(): void {
    this.clientesService.listar().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.cdr.detectChanges();
      },
    });
  }

  nuevoVehiculo(): void {
    this.editando = false;
    this.vehiculo = {
      placa: '',
      marca: '',
      modelo: '',
      anio: new Date().getFullYear(),
      clienteId: 0,
    };
  }

  editarVehiculo(vehiculo: Vehiculo): void {
    this.editando = true;
    this.vehiculo = {
      ...vehiculo,
      clienteId: vehiculo.cliente?.id,
    };
  }

  guardarVehiculo(): void {
    if (!this.vehiculo.placa || !this.vehiculo.marca || !this.vehiculo.modelo || !this.vehiculo.anio || !this.vehiculo.clienteId) {
      Swal.fire('Campos incompletos', 'Complete todos los datos.', 'warning');
      return;
    }

    if (this.editando && this.vehiculo.id) {
      this.vehiculosService.actualizar(this.vehiculo.id, this.vehiculo).subscribe({
        next: () => {
          this.cargarVehiculos();
          Swal.fire('Actualizado', 'Vehículo actualizado correctamente.', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el vehículo.', 'error'),
      });
      return;
    }

    this.vehiculosService.crear(this.vehiculo).subscribe({
      next: () => {
        this.cargarVehiculos();
        Swal.fire('Registrado', 'Vehículo creado correctamente.', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo crear el vehículo.', 'error'),
    });
  }

  eliminarVehiculo(id: number): void {
    Swal.fire({
      title: '¿Eliminar vehículo?',
      text: 'También se eliminarán los servicios relacionados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculosService.eliminar(id).subscribe({
          next: () => {
            this.vehiculos = this.vehiculos.filter((v) => v.id !== id);
            this.busqueda = '';
            this.cdr.detectChanges();
            Swal.fire('Eliminado', 'Vehículo eliminado correctamente.', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el vehículo.', 'error'),
        });
      }
    });
  }
}