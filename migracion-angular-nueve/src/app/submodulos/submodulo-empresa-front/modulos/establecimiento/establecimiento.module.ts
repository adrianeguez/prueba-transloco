import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstablecimientoFormularioComponent } from './componentes/establecimiento-formulario/establecimiento-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RutaGestionEstablecimientosComponent } from './rutas/ruta-gestion-establecimientos/ruta-gestion-establecimientos.component';
import { CrearEditarEstablecimientoComponent } from './modales/crear-editar-establecimiento/crear-editar-establecimiento.component';
import { EstablecimientoRoutingModule } from './establecimiento-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';
@NgModule({
  declarations: [
    EstablecimientoFormularioComponent,
    RutaGestionEstablecimientosComponent,
    CrearEditarEstablecimientoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    EstablecimientoRoutingModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  exports: [RutaGestionEstablecimientosComponent],
  entryComponents: [CrearEditarEstablecimientoComponent],
  providers: [],
})
export class EstablecimientoModule {}
