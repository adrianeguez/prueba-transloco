import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { ModalCrearEditarInformacionTributariaComponent } from './modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {FormularioInformacionTributariaModule} from '../../formularios/formulario-informacion-tributaria-pedido/formulario-informacion-tributaria.module';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ModalCrearEditarInformacionTributariaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormularioInformacionTributariaModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
  ]
})
export class ModalCrearEditarInformacionTributariaModule { }
