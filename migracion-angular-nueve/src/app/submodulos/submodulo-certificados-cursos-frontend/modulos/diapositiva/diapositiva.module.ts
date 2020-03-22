import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearEditarDiapositivaComponent} from './modales/crear-editar-diapositiva/crear-editar-diapositiva.component';
import {RutaGestionDiapositivaComponent} from './rutas/ruta-gestion-diapositiva/ruta-gestion-diapositiva.component';
import {DiapositivaRoutingModule} from './diapositiva.routing.module';
import {ManLabNgBootstrapModule, ManLabNgModule, SelectEstadoModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {RutaMenuDiapositivaComponent} from './rutas/ruta-menu-diapositiva/ruta-menu-diapositiva.component';
import {ItemMenuModule} from '../../../submodulo-front-comun/modulos/item-menu/item-menu.module';
import {BarraDiapositivasComponent} from './componentes/barra-diapositivas/barra-diapositivas.component';
import {VisorDiapositivaComponent} from './componentes/visor-diapositiva/visor-diapositiva.component';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {CronometroModule} from './componentes/cronometro/cronometro.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiapositivaFormularioModule} from './componentes/formulario-diapositiva/diapositiva-formulario.module';
import {PickListModule} from 'primeng/picklist';
import {PruebaRestService} from '../prueba/servicios/rest/prueba.rest.service';
import {AsignacionDragDropModule} from './componentes/asignacion-drag-drop/asignacion-drag-drop.module';
import {ArregloPruebasPipe} from './pipes/arreglo-pruebas.pipe';
import {GestionOrdenModule} from '../modulo-curso/modales/gestion-orden/gestion.orden.module';
import {TranslocoModule} from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    CrearEditarDiapositivaComponent,
    RutaGestionDiapositivaComponent,
    RutaMenuDiapositivaComponent,
    BarraDiapositivasComponent,
    VisorDiapositivaComponent,
    ArregloPruebasPipe
  ],
  imports: [
    CommonModule,
    DiapositivaRoutingModule,
    TituloPantallaModule,
    TableModule,
    ManLabNgBootstrapModule,
    ItemMenuModule,
    NgxAudioPlayerModule,
    CronometroModule,
    FormsModule,
    ReactiveFormsModule,
    ManLabNgModule,
    DiapositivaFormularioModule,
    SelectEstadoModule,
    PickListModule,
    AsignacionDragDropModule,
    GestionOrdenModule,
    TranslocoModule,
    DropdownModule,
  ],
  entryComponents: [
    CrearEditarDiapositivaComponent,
  ],
  providers: [
    PruebaRestService,
  ]
})
export class DiapositivaModule {
}
