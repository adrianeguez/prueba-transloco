import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodigoPaisFormularioComponent } from './componentes/formulario-codigo-pais/codigo-pais-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ManLabNgBootstrapModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { RutaGestionCodigosPaisComponent } from './rutas/ruta-gestion-codigos-pais/ruta-gestion-codigos-pais.component';
import { CrearEditarCodigoPaisComponent } from './modales/crear-editar-codigo-pais/crear-editar-codigo-pais.component';
import { CodigoPaisRoutingModule } from './codigo-pais-routing.module';

@NgModule({
  declarations: [
    CodigoPaisFormularioComponent,
    RutaGestionCodigosPaisComponent,
    CrearEditarCodigoPaisComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    CodigoPaisRoutingModule,
  ],
  exports: [RutaGestionCodigosPaisComponent],
  entryComponents: [CrearEditarCodigoPaisComponent],
  providers: [],
})
export class CodigoPaisModule {}
