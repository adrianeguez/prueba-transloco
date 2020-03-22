import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { TipoLogroVisitaFormularioComponent } from './componentes/tipo-logro-visita-formulario/tipo-logro-visita-formulario.component';
import { CrearEditarTipoLogroVisitaComponent } from './modales/crear-editar-tipo-logro-visita/crear-editar-tipo-logro-visita.component';
import { RutaGestionTipoLogroVisitaComponent } from './rutas/ruta-gestion-tipo-logro-visita/ruta-gestion-tipo-logro-visita.component';
import { TipoLogroVisitaRoutingModule } from './tipo-logro-visita-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionTipoLogroVisitaComponent,
    CrearEditarTipoLogroVisitaComponent,
    TipoLogroVisitaFormularioComponent,
  ],
  imports: [
    CommonModule,
    TipoLogroVisitaRoutingModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    FormsModule,
    SelectEstadoModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarTipoLogroVisitaComponent],
  exports: [RutaGestionTipoLogroVisitaComponent],
})
export class TipoLogroVisitaModule {}
