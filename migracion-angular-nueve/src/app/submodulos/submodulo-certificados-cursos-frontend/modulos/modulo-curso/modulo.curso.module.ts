import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuloCursoRoutingModule} from './modulo-curso-routing.module';
import {RutaGestionModuloCursoComponent} from './rutas/ruta-gestion-modulo-curso/ruta-gestion-modulo-curso.component';
import {CrearEditarModuloCursoComponent} from './modales/crear-editar-modulo-curso/crear-editar-modulo-curso.component';
import {ManLabNgBootstrapModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TableModule} from 'primeng/table';
import {RutaMenuModuloCursoComponent} from './rutas/ruta-menu-modulo-curso/ruta-menu-modulo-curso.component';
import {ItemMenuModule} from '../../../submodulo-front-comun/modulos/item-menu/item-menu.module';
import {DiapositivaActualComponent} from './componentes/diapositiva-actual/diapositiva-actual.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {FormularioModuloCursoModule} from './componentes/formulario-modulo-curso/formulario-modulo-curso.module';
import {ModalSubirCaratulaComponent} from './modales/modal-subir-caratula/modal-subir-caratula.component';
import {MatButtonModule} from '@angular/material/button';
import {EzFormModule} from '@gordon_freeman/ez-form';
import {VisorCaratulaComponent} from './componentes/visor-caratula/visor-caratula.component';
import {DragDropModule} from 'primeng/dragdrop';
import {PickListModule} from 'primeng/picklist';
import {GestionOrdenModule} from './modales/gestion-orden/gestion.orden.module';
import {ToasterModule} from 'angular2-toaster';
import {TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [
    RutaGestionModuloCursoComponent,
    CrearEditarModuloCursoComponent,
    RutaMenuModuloCursoComponent,
    DiapositivaActualComponent,
    ModalSubirCaratulaComponent,
    VisorCaratulaComponent,
  ],
  imports: [
    CommonModule,
    ModuloCursoRoutingModule,
    ManLabNgBootstrapModule,
    TituloPantallaModule,
    TableModule,
    ItemMenuModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormularioModuloCursoModule,
    ModalModule,
    MatButtonModule,
    EzFormModule,
    DragDropModule,
    PickListModule,
    GestionOrdenModule,
    ToasterModule,
    SelectEstadoModule,
    TranslocoModule,
  ],
  entryComponents: [
    CrearEditarModuloCursoComponent,
    ModalSubirCaratulaComponent,
  ]
})
export class ModuloCursoModule {
}
