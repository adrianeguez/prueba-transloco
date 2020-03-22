import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { CrearEditarMovimientoComponent } from './modales/crear-editar-movimiento/crear-editar-movimiento.component';
import { RutaGestionMovimientosComponent } from './rutas/ruta-gestion-movimientos/ruta-gestion-movimientos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { AutoCompleteModule, DropdownModule } from 'primeng/primeng';
import { MovimientoFormularioComponent } from './componentes/movimiento-formulario/movimiento-formulario.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarMovimientoComponent,
    RutaGestionMovimientosComponent,
    MovimientoFormularioComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    DropdownModule,
    SelectEstadoModule,
    AutoCompleteModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarMovimientoComponent],
})
export class MovimientoModule {}
