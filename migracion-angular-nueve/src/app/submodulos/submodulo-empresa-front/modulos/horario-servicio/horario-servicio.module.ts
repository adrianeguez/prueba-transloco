import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HorarioServicioRoutingModule} from './horario-servicio-routing.module';
import {RutaGestionHorarioServicioComponent} from './rutas/ruta-gestion-horario-servicio/ruta-gestion-horario-servicio.component';
import {ManLabNgBootstrapModule, ManLabNgModule, SelectEstadoModule} from 'man-lab-ng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {CrearEditarHorarioComponent} from '../../../submodulo-menu-front/modulos/horario/modales/modal-crear-editar-horario/modal-crear-editar-horario/crear-editar-horario.component';
import {ModalCrearEditarHorarioModule} from '../../../submodulo-menu-front/modulos/horario/modales/modal-crear-editar-horario/modal-crear-editar-horario.module';
import {RutaHorarioEstablecimientoCursoComponent} from './rutas/ruta-horario-establecimiento-curso/ruta-horario-establecimiento-curso.component';
import {CrearPedidoCursoModule} from '../../../submodulo-certificados-cursos-frontend/modulos/pedido/modales/crear-pedido-curso/crear-pedido-curso.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    RutaGestionHorarioServicioComponent,
    RutaHorarioEstablecimientoCursoComponent
  ],
  imports: [
    CommonModule,
    HorarioServicioRoutingModule,
    ManLabNgBootstrapModule,
    TituloPantallaModule,
    TableModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    SelectEstadoModule,
    ModalCrearEditarHorarioModule,
    CrearPedidoCursoModule,
    TranslocoModule,
  ],
  exports: [
    RutaGestionHorarioServicioComponent,
  ],
  entryComponents: [CrearEditarHorarioComponent]
})
export class HorarioServicioModule {
}
