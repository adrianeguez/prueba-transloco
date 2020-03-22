import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PreguntaRoutingModule} from './pregunta-routing.module';
import {CrearEditarPreguntaComponent} from './modales/crear-editar-pregunta/crear-editar-pregunta.component';
import {RutaGestionPreguntaComponent} from './rutas/ruta-gestion-pregunta/ruta-gestion-pregunta.component';
import {ManLabNgBootstrapModule, ManLabNgModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreguntaFormularioModule} from './componentes/pregunta-formulario/pregunta-formulario.module';
import {TablaPreguntaModule} from './componentes/tabla-preguntas/tabla-pregunta.module';
import { SeleccionarPreguntasComponent } from './modales/modal-seleccionar-preguntas/seleccionar-preguntas.component';
import {ListaPreguntasModule} from './componentes/lista-preguntas/lista-preguntas.module';
import {RutaAsignacionPreguntaComponent} from './rutas/ruta-asignacion-pregunta/ruta-asignacion-pregunta.component';
import {TranslocoModule} from '@ngneat/transloco';
import {MostrarOpcionesModule} from '../opcion/modales/mostrar-opciones/mostrar-opciones.module';

@NgModule({
  declarations: [
    CrearEditarPreguntaComponent,
    RutaGestionPreguntaComponent,
    SeleccionarPreguntasComponent,
    RutaAsignacionPreguntaComponent,
  ],
  imports: [
    CommonModule,
    TablaPreguntaModule,
    PreguntaRoutingModule,
    ManLabNgBootstrapModule,
    TranslocoModule,
    TituloPantallaModule,
    TableModule,
    FormsModule,
    ManLabNgModule,
    PreguntaFormularioModule,
    ListaPreguntasModule,
    MostrarOpcionesModule,
  ],
  entryComponents: [
    CrearEditarPreguntaComponent,
    SeleccionarPreguntasComponent,
  ]
})
export class PreguntaModule {
}
