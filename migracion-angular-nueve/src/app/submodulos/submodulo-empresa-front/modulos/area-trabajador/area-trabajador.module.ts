import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaTrabajadorRoutingModule } from './area-trabajador-routing.module';
import { CrearEditarAreaTrabajadorComponent } from './modales/crear-editar-area-trabajador/crear-editar-area-trabajador.component';
import { RutaGestionAreasTrabajadorComponent } from './rutas/ruta-gestion-areas-trabajador/ruta-gestion-areas-trabajador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule, TreeTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { AreaTrabajadorFormularioComponent } from './componentes/area-trabajador-formulario/area-trabajador-formulario.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarAreaTrabajadorComponent,
    RutaGestionAreasTrabajadorComponent,
    AreaTrabajadorFormularioComponent,
  ],
  imports: [
    CommonModule,
    AreaTrabajadorRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TreeTableModule,
    FormsModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  providers: [],
  exports: [RutaGestionAreasTrabajadorComponent],
  entryComponents: [CrearEditarAreaTrabajadorComponent],
})
export class AreaTrabajadorModule {}
