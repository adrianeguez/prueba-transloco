import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaVendedorRoutingModule } from './cronograma-vendedor-routing.module';
// tslint:disable-next-line:max-line-length
import { RutaGestionCronogramaVendedorComponent } from './rutas/ruta-gestion-cronograma-vendedor/ruta-gestion-cronograma-vendedor.component';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { ModalCrearEditarCronoCabeceraModule } from './modales/modal-crear-editar-crono-cabecera/modal-crear-editar-crono-cabecera.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalCrearEditarCronoDetalleModule } from './modales/modal-crear-editar-crono-detalle/modal-crear-editar-crono-detalle.module';
import { RutaGestionCronogramaDetalleComponent } from './rutas/ruta-gestion-cronograma-detalle/ruta-gestion-cronograma-detalle.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionCronogramaVendedorComponent,
    RutaGestionCronogramaDetalleComponent,
  ],
  imports: [
    CommonModule,
    CronogramaVendedorRoutingModule,
    ManLabNgBootstrapModule,
    TableModule,
    ModalCrearEditarCronoCabeceraModule,
    ModalCrearEditarCronoDetalleModule,
    ReactiveFormsModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionCronogramaVendedorComponent],
})
export class CronogramaVendedorModule {}
