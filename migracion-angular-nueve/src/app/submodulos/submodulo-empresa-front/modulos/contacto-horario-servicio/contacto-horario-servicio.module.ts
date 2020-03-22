import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoHorarioServicioRoutingModule } from './contacto-horario-servicio-routing.module';
import { RutaGestionContactoHorarioServicioComponent } from './rutas/ruta-gestion-contacto-horario-servicio/ruta-gestion-contacto-horario-servicio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, ManLabNgModule, SelectEstadoModule} from 'man-lab-ng';
import {AutoCompleteModule} from 'primeng/primeng';
import {SelectTipoCargoModule} from '../../componentes/selects/select-tipo-cargo/select-tipo-cargo.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ModalCrearContactoEmpresaModule} from '../contacto-empresa/modales/modal-crear-contacto-empresa/modal-crear-contacto-empresa.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CrearEditarContactoEmpresaComponent} from '../contacto-empresa/modales/modal-crear-contacto-empresa/crear-editar-contacto-empresa/crear-editar-contacto-empresa.component';
import { CrearEditarContactoHorarioServicioComponent } from './modales/crear-editar-contacto-horario-servicio/crear-editar-contacto-horario-servicio.component';
import {SeleccionarContactoEmpresaModule} from '../contacto-empresa/modales/modal-seleccionar-contacto-empresa/seleccionar-contacto-empresa.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [RutaGestionContactoHorarioServicioComponent, CrearEditarContactoHorarioServicioComponent],
  imports: [
    CommonModule,
    ContactoHorarioServicioRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    FormsModule,
    AutoCompleteModule,
    SelectEstadoModule,
    SelectTipoCargoModule,
    TituloPantallaModule,
    ModalCrearContactoEmpresaModule,
    SeleccionarContactoEmpresaModule,
    ManLabNgModule,
    TranslocoModule,
  ],
  entryComponents: [CrearEditarContactoEmpresaComponent]
})
export class ContactoHorarioServicioModule { }
