import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PisoFormularioComponent } from './componentes/piso-formulario/piso-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RutaGestionPisosComponent } from './rutas/ruta-gestion-pisos/ruta-gestion-pisos.component';
import { CrearEditarPisoComponent } from './modales/crear-editar-piso/crear-editar-piso.component';
import { PisoRoutingModule } from './piso-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    PisoFormularioComponent,
    RutaGestionPisosComponent,
    CrearEditarPisoComponent,
  ],
  exports: [RutaGestionPisosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    PisoRoutingModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarPisoComponent],
  providers: [],
})
export class PisoModule {}
