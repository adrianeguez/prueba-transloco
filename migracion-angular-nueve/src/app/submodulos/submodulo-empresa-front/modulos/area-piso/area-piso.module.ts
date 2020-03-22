import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPisoFormularioComponent } from './componentes/area-piso-formulario/area-piso-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/primeng';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { CrearEditarAreaPisoComponent } from './modales/crear-editar-area-piso/crear-editar-area-piso.component';
import { RutaGestionAreasPisoComponent } from './rutas/ruta-gestion-areas-piso/ruta-gestion-areas-piso.component';
import { AreaPisoRoutingModule } from './area-piso-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    AreaPisoFormularioComponent,
    CrearEditarAreaPisoComponent,
    RutaGestionAreasPisoComponent,
  ],
  exports: [RutaGestionAreasPisoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    TreeTableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    AreaPisoRoutingModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarAreaPisoComponent],
  providers: [],
})
export class AreaPisoModule {}
