import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionProveedorRoutingModule } from './calificacion-proveedor-routing.module';
import { RutaGestionCalificacionesProveedorComponent } from './rutas/ruta-gestion-calificaciones-proveedor/ruta-gestion-calificaciones-proveedor.component';
import { CrearEditarCalificacionProveedorComponent } from './modales/crear-editar-calificacion-proveedor/crear-editar-calificacion-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { CalificacionProveedorFormularioComponent } from './componentes/calificacion-proveedor-formulario/calificacion-proveedor-formulario.component';
import {RatingModule} from 'primeng/primeng';
import {SelectCalificacionesModule} from '../../componentes/selects/select-calificaciones/select-calificaciones.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionCalificacionesProveedorComponent,
    CrearEditarCalificacionProveedorComponent,
    CalificacionProveedorFormularioComponent,
  ],
  imports: [
    CommonModule,
    CalificacionProveedorRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    RatingModule,
    SelectCalificacionesModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionCalificacionesProveedorComponent],
  entryComponents: [CrearEditarCalificacionProveedorComponent],
  providers: [],
})
export class CalificacionProveedorModule {}
