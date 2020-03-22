import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntoEmisionRoutingModule } from './punto-emision-routing.module';
import { CrearEditarPuntoEmisionComponent } from './modales/crear-editar-punto-emision/crear-editar-punto-emision.component';
import { RutaGestionPuntosEmisionComponent } from './rutas/ruta-gestion-puntos-emision/ruta-gestion-puntos-emision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { PuntoEmisionFormularioComponent } from './componentes/punto-emision-formulario/punto-emision-formulario.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarPuntoEmisionComponent,
    RutaGestionPuntosEmisionComponent,
    PuntoEmisionFormularioComponent,
  ],
  imports: [
    CommonModule,
    PuntoEmisionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    AutoCompleteModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarPuntoEmisionComponent],
})
export class PuntoEmisionModule {}
