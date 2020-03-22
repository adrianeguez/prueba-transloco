import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { EscalaVendedorPorPeriodoRoutingModule } from './escala-vendedor-por-periodo-routing.module';
import { RutaGestionEscalaVendedorPorPeriodoComponent } from './rutas/ruta-gestion-escala-vendedor-por-periodo/ruta-gestion-escala-vendedor-por-periodo.component';

@NgModule({
  declarations: [RutaGestionEscalaVendedorPorPeriodoComponent],
  imports: [
    CommonModule,
    EscalaVendedorPorPeriodoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
  ],
  exports: [RutaGestionEscalaVendedorPorPeriodoComponent],
})
export class EscalaVendedorPorPeriodoModule {}
