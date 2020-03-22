import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OpcionRoutingModule} from './opcion-routing.module';
import {CrearEditarOpcionComponent} from './modales/crear-editar-opcion/crear-editar-opcion.component';
import {RutaGestionOpcionComponent} from './rutas/ruta-gestion-opcion/ruta-gestion-opcion.component';
import {ManLabNgBootstrapModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TableModule} from 'primeng/table';
import {EsRespuestaPipe} from './pipe/es-respuesta.pipe';
import {FormsModule} from '@angular/forms';
import {OpcionFormularioModule} from './componentes/opcion-formulario/opcion-formulario.module';
import {MostrarOpcionesModule} from './modales/mostrar-opciones/mostrar-opciones.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [CrearEditarOpcionComponent, RutaGestionOpcionComponent, EsRespuestaPipe],
    imports: [
        CommonModule,
        OpcionRoutingModule,
        ManLabNgBootstrapModule,
        TituloPantallaModule,
        TableModule,
        FormsModule,
        OpcionFormularioModule,
        ModalModule,
        SelectEstadoModule,
        MostrarOpcionesModule,
        TranslocoModule,
    ],
  entryComponents: [
    CrearEditarOpcionComponent
  ],
  exports: [
    EsRespuestaPipe
  ]
})
export class OpcionModule {
}
