import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubempresaRoutingModule } from './subempresa-routing.module';
import { RutaGestionSubempresasComponent } from './rutas/ruta-gestion-subempresas/ruta-gestion-subempresas.component';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearEditarSubempresaComponent } from './modales/crear-editar-subempresa/crear-editar-subempresa.component';
import { SubempresaFormularioComponent } from './componentes/subempresa-formulario/subempresa-formulario.component';
import { AutoCompleteModule, TreeTableModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    RutaGestionSubempresasComponent,
    CrearEditarSubempresaComponent,
    SubempresaFormularioComponent,
  ],
  imports: [
    CommonModule,
    SubempresaRoutingModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    TreeTableModule,
    AutoCompleteModule,
    ReactiveFormsModule,
  ],
  exports: [RutaGestionSubempresasComponent],
  entryComponents: [CrearEditarSubempresaComponent],
})
export class SubempresaModule {}
