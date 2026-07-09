import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { Clientes } from '../../services/clientes';
import { Vehiculos } from '../../services/vehiculos';
import { Servicios } from '../../services/servicios';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private clientesService = inject(Clientes);
  private vehiculosService = inject(Vehiculos);
  private serviciosService = inject(Servicios);
  private cdr = inject(ChangeDetectorRef);

  totalClientes = 0;
  totalVehiculos = 0;
  totalServicios = 0;
  ingresos = 0;

  ultimosServicios: Servicio[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.clientesService.listar().subscribe((data) => {
      this.totalClientes = data.length;
      this.cdr.detectChanges();
    });

    this.vehiculosService.listar().subscribe((data) => {
      this.totalVehiculos = data.length;
      this.cdr.detectChanges();
    });

    this.serviciosService.listar().subscribe((data) => {
      this.totalServicios = data.length;
      this.ingresos = data.reduce((sum, s) => sum + Number(s.costo), 0);
      this.ultimosServicios = [...data].slice(-5).reverse();
      this.cdr.detectChanges();
    });
  }
}