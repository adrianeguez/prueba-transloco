import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemaRoutingModule} from './tema-routing.module';
import {RutaGestionTemaComponent} from './rutas/ruta-gestion-tema/ruta-gestion-tema.component';
import {CrearEditarTemaComponent} from './modales/crear-editar-tema/crear-editar-tema.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ManLabNgBootstrapModule, ManLabNgModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {RutaMenuTemaComponent} from './rutas/ruta-menu-tema/ruta-menu-tema.component';
import {ItemMenuModule} from '../../../submodulo-front-comun/modulos/item-menu/item-menu.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TemaFormularioModule} from './componentes/tema-formulario/tema-formulario.module';
import {SubirAudioModule} from './modales/modal-subir-audio/subir-audio.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    RutaGestionTemaComponent,
    CrearEditarTemaComponent,
    RutaMenuTemaComponent,
  ],
  imports: [
    CommonModule,
    TemaRoutingModule,
    TituloPantallaModule,
    ManLabNgBootstrapModule,
    TableModule,
    ItemMenuModule,
    TemaFormularioModule,
    ManLabNgModule,
    FormsModule,
    ReactiveFormsModule,
    SubirAudioModule,
    SelectEstadoModule,
    TranslocoModule
  ],
  entryComponents: [
    CrearEditarTemaComponent,
  ]
})
export class TemaModule {
}
