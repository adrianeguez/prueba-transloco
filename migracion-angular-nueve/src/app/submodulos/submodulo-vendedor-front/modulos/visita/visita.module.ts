import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaRoutingModule } from './visita-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FilterFechasModule,
  ManLabNgBootstrapModule,
  SelectEstadoModule,
} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RutaGestionVisitaComponent } from './rutas/ruta-gestion-visita/ruta-gestion-visita.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaGestionVisitaComponent],
  imports: [
    CommonModule,
    VisitaRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    NgbDatepickerModule,
    FilterFechasModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionVisitaComponent],
})
export class VisitaModule {}
