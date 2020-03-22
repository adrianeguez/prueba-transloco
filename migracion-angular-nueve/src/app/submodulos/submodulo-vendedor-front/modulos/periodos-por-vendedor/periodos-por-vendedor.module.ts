import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { PeriodosPorVendedorRoutingModule } from './periodos-por-vendedor-routing.module';
import { RutaGestionPeriodosPorVendedorComponent } from './rutas/ruta-gestion-periodos-por-vendedor/ruta-gestion-periodos-por-vendedor.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaGestionPeriodosPorVendedorComponent],
  imports: [
    CommonModule,
    PeriodosPorVendedorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionPeriodosPorVendedorComponent],
})
export class PeriodosPorVendedorModule {}
