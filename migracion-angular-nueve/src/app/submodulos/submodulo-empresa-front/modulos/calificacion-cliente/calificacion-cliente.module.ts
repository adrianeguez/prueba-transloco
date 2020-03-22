import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionClienteRoutingModule } from './calificacion-cliente-routing.module';
import { RutaGestionCalificacionesClienteComponent } from './rutas/ruta-gestion-calificaciones-cliente/ruta-gestion-calificaciones-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { CrearEditarCalificacionClienteComponent } from './modales/crear-editar-calificacion-cliente/crear-editar-calificacion-cliente.component';
import { CalificacionClienteFormularioComponent } from './componentes/calificacion-cliente-formulario/calificacion-cliente-formulario.component';
import {RatingModule} from 'primeng/rating';
import {SelectCalificacionesModule} from '../../componentes/selects/select-calificaciones/select-calificaciones.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionCalificacionesClienteComponent,
    CrearEditarCalificacionClienteComponent,
    CalificacionClienteFormularioComponent,
  ],
  imports: [
    CommonModule,
    CalificacionClienteRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    RatingModule,
    SelectCalificacionesModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionCalificacionesClienteComponent],
  entryComponents: [CrearEditarCalificacionClienteComponent],
  providers: [],
})
export class CalificacionClienteModule {}
