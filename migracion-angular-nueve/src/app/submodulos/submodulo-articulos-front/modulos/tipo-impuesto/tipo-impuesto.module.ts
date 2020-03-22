import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {ConfirmacionModule, ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { TipoImpuestoFormularioComponent } from './componentes/tipo-impuesto-formulario/tipo-impuesto-formulario.component';
import { CrearEditarTipoImpuestoComponent } from './modales/crear-editar-tipo-impuesto/crear-editar-tipo-impuesto.component';
import { RutaGestionTipoImpuestoComponent } from './rutas/ruta-gestion-tipo-impuesto/ruta-gestion-tipo-impuesto.component';
import { TipoImpuestoRoutingModule } from './tipo-impuesto-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    TipoImpuestoFormularioComponent,
    RutaGestionTipoImpuestoComponent,
    CrearEditarTipoImpuestoComponent,
  ],
  imports: [
    CommonModule,
    TipoImpuestoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    TituloPantallaModule
  ],
  entryComponents: [CrearEditarTipoImpuestoComponent],
  exports: [RutaGestionTipoImpuestoComponent],
  providers: [],
})
export class TipoImpuestoModule {}
