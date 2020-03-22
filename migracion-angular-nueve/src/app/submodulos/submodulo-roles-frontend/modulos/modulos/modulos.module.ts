import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulosRoutingModule } from './modulos-routing.module';
import { RutaGestionModulosSistemaComponent } from './rutas/ruta-gestion-modulos-sistema/ruta-gestion-modulos-sistema.component';
import { CrearEditarModulosSistemaComponent } from './modales/crear-editar-modulos-sistema/crear-editar-modulos-sistema.component';
import {ModulosSistemaFormularioComponent} from './componentes/modulos-sistema-formulario/modulos-sistema-formulario.component';
import {ManLabNgBootstrapModule, ModalModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModulosSistemaRestService} from '../../servicios/rest/modulos-sistema-rest.service';

@NgModule({
  declarations: [
    RutaGestionModulosSistemaComponent,
    CrearEditarModulosSistemaComponent,
    ModulosSistemaFormularioComponent
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    ModalModule,
    ManLabNgBootstrapModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule

  ],
  entryComponents: [
    CrearEditarModulosSistemaComponent,
  ],
  providers: [
    ModulosSistemaRestService,
  ]
})
export class ModulosModule { }
