import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { Servicio } from '../../models/servicio.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { Servicios as ServiciosService } from '../../services/servicios';
import { Vehiculos } from '../../services/vehiculos';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios implements OnInit {
  private serviciosService = inject(ServiciosService);
  private vehiculosService = inject(Vehiculos);
  private cdr = inject(ChangeDetectorRef);

  servicios: Servicio[] = [];
  vehiculos: Vehiculo[] = [];
  busqueda = '';
  editando = false;

  servicio: Servicio = {
    tipo: '',
    descripcion: '',
    fecha: new Date().toISOString().substring(0, 10),
    costo: 0,
    estado: 'Pendiente',
    vehiculoId: 0,
  };

  estados = ['Pendiente', 'En proceso', 'Finalizado'];

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarVehiculos();
  }

  get serviciosFiltrados(): Servicio[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.servicios.filter((s) =>
      `${s.tipo} ${s.descripcion} ${s.estado} ${s.vehiculo?.placa || ''} ${s.vehiculo?.marca || ''}`
        .toLowerCase()
        .includes(texto),
    );
  }

  cargarServicios(): void {
    this.serviciosService.listar().subscribe({
      next: (data) => {
        this.servicios = [...data];
        this.busqueda = '';
        this.cdr.detectChanges();
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los servicios.', 'error'),
    });
  }

  cargarVehiculos(): void {
    this.vehiculosService.listar().subscribe({
      next: (data) => {
        this.vehiculos = [...data];
        this.cdr.detectChanges();
      },
    });
  }

  nuevoServicio(): void {
    this.editando = false;
    this.servicio = {
      tipo: '',
      descripcion: '',
      fecha: new Date().toISOString().substring(0, 10),
      costo: 0,
      estado: 'Pendiente',
      vehiculoId: 0,
    };
  }

  editarServicio(servicio: Servicio): void {
    this.editando = true;
    this.servicio = {
      ...servicio,
      costo: Number(servicio.costo),
      vehiculoId: servicio.vehiculo?.id,
    };
  }

  guardarServicio(): void {
    if (!this.servicio.tipo || !this.servicio.descripcion || !this.servicio.fecha || !this.servicio.estado || !this.servicio.vehiculoId) {
      Swal.fire('Campos incompletos', 'Complete todos los datos.', 'warning');
      return;
    }

    this.servicio.costo = Number(this.servicio.costo);

    if (this.editando && this.servicio.id) {
      this.serviciosService.actualizar(this.servicio.id, this.servicio).subscribe({
        next: () => {
          this.cargarServicios();
          Swal.fire('Actualizado', 'Servicio actualizado correctamente.', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el servicio.', 'error'),
      });
      return;
    }

    this.serviciosService.crear(this.servicio).subscribe({
      next: () => {
        this.cargarServicios();
        Swal.fire('Registrado', 'Servicio creado correctamente.', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo crear el servicio.', 'error'),
    });
  }

  eliminarServicio(id: number): void {
    Swal.fire({
      title: '¿Eliminar servicio?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.eliminar(id).subscribe({
          next: () => {
            this.servicios = this.servicios.filter((s) => s.id !== id);
            this.busqueda = '';
            this.cdr.detectChanges();
            Swal.fire('Eliminado', 'Servicio eliminado correctamente.', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el servicio.', 'error'),
        });
      }
    });
  }
}