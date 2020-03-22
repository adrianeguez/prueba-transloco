import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { SubgrupoFormularioComponent } from './componentes/subgrupo-formulario/subgrupo-formulario.component';
import { CrearEditarSubgrupoComponent } from './modales/crear-editar-subgrupo/crear-editar-subgrupo.component';
import { RutaGestionSubgruposComponent } from './rutas/ruta-gestion-subgrupos/ruta-gestion-subgrupos.component';
import { SubgrupoRoutingModule } from './subgrupo-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarSubgrupoComponent,
    SubgrupoFormularioComponent,
    RutaGestionSubgruposComponent,
  ],
  imports: [
    CommonModule,
    SubgrupoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    TextMaskModule,
    TituloPantallaModule
  ],
  exports: [RutaGestionSubgruposComponent],
  entryComponents: [CrearEditarSubgrupoComponent],
  providers: [],
})
export class SubgrupoModule {}
