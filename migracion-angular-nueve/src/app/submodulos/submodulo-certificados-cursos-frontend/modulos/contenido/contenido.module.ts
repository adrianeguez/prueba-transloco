import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContenidoRoutingModule} from './contenido-routing.module';
import {CrearEditarContenidoComponent} from './modales/crear-editar-contenido/crear-editar-contenido.component';
import {RutaGestionContenidoComponent} from './rutas/ruta-gestion-contenido/ruta-gestion-contenido.component';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, ManLabNgModule, ModalModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContenidoFormularioModule} from './componentes/formulario-contenido/contenido-formulario.module';
import {SubirImagenComponent} from './modales/subir-imagen/subir-imagen.component';
import {EzFormModule} from '@gordon_freeman/ez-form';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    CrearEditarContenidoComponent,
    RutaGestionContenidoComponent,
    SubirImagenComponent,
  ],
  imports: [
    CommonModule,
    ContenidoRoutingModule,
    TableModule,
    ManLabNgBootstrapModule,
    TituloPantallaModule,
    ManLabNgModule,
    FormsModule,
    ContenidoFormularioModule,
    ReactiveFormsModule,
    ModalModule,
    TranslocoModule
  ],
  entryComponents: [
    CrearEditarContenidoComponent,
    SubirImagenComponent,
  ]
})
export class ContenidoModule {
}
