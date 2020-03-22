import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperarioRoutingModule } from './operario-routing.module';
import { CrearEditarOperarioComponent } from './modales/crear-editar-operario/crear-editar-operario.component';
import { RutaGestionOperariosComponent } from './rutas/ruta-gestion-operarios/ruta-gestion-operarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { OperarioFormularioComponent } from './componentes/operario-formulario/operario-formulario.component';
import { AutoCompleteModule } from 'primeng/primeng';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarOperarioComponent,
    RutaGestionOperariosComponent,
    OperarioFormularioComponent,
  ],
  imports: [
    CommonModule,
    OperarioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    AutoCompleteModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarOperarioComponent],
})
export class OperarioModule {}
