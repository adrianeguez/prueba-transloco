import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { HistorialImpuestoRoutingModule } from './historial-impuesto-routing.module';
import { RutaGestionHistorialImpuestoComponent } from './rutas/ruta-gestion-historial-impuesto/ruta-gestion-historial-impuesto.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaGestionHistorialImpuestoComponent],
  imports: [
    CommonModule,
    HistorialImpuestoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    DropdownModule,
    TituloPantallaModule
  ],
  exports: [RutaGestionHistorialImpuestoComponent],
  providers: [],
})
export class HistorialImpuestoModule {}
