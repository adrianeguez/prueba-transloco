import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoSistemaRoutingModule } from './tipo-sistema-routing.module';
import { RutaGestionTipoSistemaComponent } from './rutas/ruta-gestion-tipo-sistema/ruta-gestion-tipo-sistema.component';
import { CrearEditarTipoSistemaComponent } from './modales/crear-editar-tipo-sistema/crear-editar-tipo-sistema.component';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TipoSistemaRestService} from './servicios/tipo-sistema.service';
import {TipoSistemaFormularioComponent} from './componentes/tipo-sistema-formulario/tipo-sistema-formulario.component';

@NgModule({
  declarations: [
    RutaGestionTipoSistemaComponent,
    CrearEditarTipoSistemaComponent,
    TipoSistemaFormularioComponent
  ],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    TipoSistemaRoutingModule,
    ModalModule
  ],
  providers: [
    TipoSistemaRestService
  ],
  entryComponents: [
    CrearEditarTipoSistemaComponent
  ]
})
export class TipoSistemaModule { }
