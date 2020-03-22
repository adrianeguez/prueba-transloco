import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdificioFormularioComponent } from './componentes/formularios/edificio-formulario/edificio-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdificioRoutingModule } from './edificio-routing.module';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RutaGestionEdificiosComponent } from './rutas/ruta-gestion-edificios/ruta-gestion-edificios.component';
import { CrearEditarEdificioComponent } from './modales/crear-editar-edificio/crear-editar-edificio.component';
import { TableModule } from 'primeng/table';
import { DireccionFormularioComponent } from './componentes/formularios/direccion-formulario/direccion-formulario.component';
import { LocalizacionFormularioComponent } from './componentes/formularios/localizacion-formulario/localizacion-formulario.component';
// tslint:disable-next-line:max-line-length
import { ModalAsignarZonaEmpresaModule } from '../../../submodulo-vendedor-front/componentes/modal-asignar-zona-empresa/modal-asignar-zona-empresa.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ModalAsignarZonaEmpresaComponent} from '../../../submodulo-vendedor-front/componentes/modal-asignar-zona-empresa/modal-asignar-zona-empresa/modal-asignar-zona-empresa.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    EdificioFormularioComponent,
    RutaGestionEdificiosComponent,
    CrearEditarEdificioComponent,
    DireccionFormularioComponent,
    LocalizacionFormularioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EdificioRoutingModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    ModalAsignarZonaEmpresaModule,
    AutoCompleteModule,
    TituloPantallaModule,
    TextMaskModule,
  ],
  exports: [RutaGestionEdificiosComponent],
  entryComponents: [CrearEditarEdificioComponent, ModalAsignarZonaEmpresaComponent],
  providers: [],
})
export class EdificioModule {}
