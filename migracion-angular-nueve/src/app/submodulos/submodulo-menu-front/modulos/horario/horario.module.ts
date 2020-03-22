import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { RutaGestionHorarioComponent } from './rutas/ruta-gestion-horario/ruta-gestion-horario.component';
import { CrearEditarHorarioComponent } from './modales/modal-crear-editar-horario/modal-crear-editar-horario/crear-editar-horario.component';
import { HorarioFormularioModule } from './componentes/horario-formulario/horario-formulario.module';
import {
  ManLabNgBootstrapModule,
  ManLabNgModule,
  ModalModule,
  SelectEstadoModule,
} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TituloPantallaModule } from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {ModalCrearEditarHorarioModule} from './modales/modal-crear-editar-horario/modal-crear-editar-horario.module';

@NgModule({
  declarations: [RutaGestionHorarioComponent],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    HorarioFormularioModule,
    ManLabNgBootstrapModule,
    TableModule,
    MatDialogModule,
    TituloPantallaModule,
    FormsModule,
    SelectEstadoModule,
    ReactiveFormsModule,
    ManLabNgModule,
    ModalModule,
    ModalCrearEditarHorarioModule,
  ],
  entryComponents: [CrearEditarHorarioComponent],
})
export class HorarioModule {}
