import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoMovimientoRoutingModule } from './tipo-movimiento-routing.module';
import { CrearEditarTipoMovimientoComponent } from './modales/crear-editar-tipo-movimiento/crear-editar-tipo-movimiento.component';
import { RutaGestionTiposMovimientoComponent } from './rutas/ruta-gestion-tipos-movimiento/ruta-gestion-tipos-movimiento.component';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoMovimientoFormularioComponent } from './componentes/tipo-movimiento-formulario/tipo-movimiento-formulario.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarTipoMovimientoComponent,
    RutaGestionTiposMovimientoComponent,
    TipoMovimientoFormularioComponent,
  ],
  imports: [
    CommonModule,
    TipoMovimientoRoutingModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarTipoMovimientoComponent],
})
export class TipoMovimientoModule {}
