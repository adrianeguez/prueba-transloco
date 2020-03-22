import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContactoEmpresaRoutingModule} from '../../contacto-empresa-routing.module';
import {TableModule} from 'primeng/table';
import {ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import {AutoCompleteModule} from 'primeng/primeng';
import {SelectTipoCargoModule} from '../../../../componentes/selects/select-tipo-cargo/select-tipo-cargo.module';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CrearEditarContactoEmpresaComponent} from './crear-editar-contacto-empresa/crear-editar-contacto-empresa.component';
import {ContactoEmpresaFormularioComponent} from '../../componentes/contacto-empresa-formulario/contacto-empresa-formulario.component';

@NgModule({
  declarations: [
    ContactoEmpresaFormularioComponent,
    CrearEditarContactoEmpresaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    FormsModule,
    AutoCompleteModule,
    SelectEstadoModule,
    SelectTipoCargoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarContactoEmpresaComponent],
  exports: [CrearEditarContactoEmpresaComponent]
})
export class ModalCrearContactoEmpresaModule { }
