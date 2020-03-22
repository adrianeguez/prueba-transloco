import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodegaFormularioComponent } from './componentes/formulario-bodega/bodega-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { RutaGestionBodegasComponent } from './rutas/ruta-gestion-bodegas/ruta-gestion-bodegas.component';
import { CrearEditarBodegaComponent } from './modales/crear-editar-bodega/crear-editar-bodega.component';
import { BodegaRoutingModule } from './bodega-routing.module';
import { AutoCompleteModule, DropdownModule } from 'primeng/primeng';
import { SelectEsPerchaBodegaModule } from '../../componentes/selects/select-es-percha-bodega/select-es-percha-bodega.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    BodegaFormularioComponent,
    RutaGestionBodegasComponent,
    CrearEditarBodegaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    BodegaRoutingModule,
    DropdownModule,
    SelectEstadoModule,
    AutoCompleteModule,
    SelectEsPerchaBodegaModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarBodegaComponent],
  exports: [RutaGestionBodegasComponent],
  providers: [],
})
export class BodegaModule {}
