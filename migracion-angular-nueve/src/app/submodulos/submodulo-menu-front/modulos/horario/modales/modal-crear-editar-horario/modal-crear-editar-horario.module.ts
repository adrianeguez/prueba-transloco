import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {CrearEditarHorarioComponent} from './modal-crear-editar-horario/crear-editar-horario.component';
import {TituloPantallaModule} from '../../../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManLabNgModule, ModalModule, SelectEstadoModule} from 'man-lab-ng';
import {HorarioFormularioModule} from '../../componentes/horario-formulario/horario-formulario.module';

@NgModule({
  declarations: [CrearEditarHorarioComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TituloPantallaModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    ManLabNgModule,
    ModalModule,
    HorarioFormularioModule,
  ],
  exports: [CrearEditarHorarioComponent],
  entryComponents: [CrearEditarHorarioComponent],
})
export class ModalCrearEditarHorarioModule {}
