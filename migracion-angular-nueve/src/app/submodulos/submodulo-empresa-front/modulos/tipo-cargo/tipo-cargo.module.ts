import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCargoRoutingModule } from './tipo-cargo-routing.module';
import { RutaGestionTiposCargosComponent } from './rutas/ruta-gestion-tipos-cargos/ruta-gestion-tipos-cargos.component';
import { CrearEditarTipoCargoComponent } from './modales/crear-editar-tipo-cargo/crear-editar-tipo-cargo.component';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoCargoFormularioComponent } from './componentes/tipo-cargo-formulario/tipo-cargo-formulario.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionTiposCargosComponent,
    CrearEditarTipoCargoComponent,
    TipoCargoFormularioComponent,
  ],
  imports: [
    CommonModule,
    TipoCargoRoutingModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionTiposCargosComponent],
  entryComponents: [CrearEditarTipoCargoComponent],
})
export class TipoCargoModule {}
