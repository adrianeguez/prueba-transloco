import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { ManLabNgBootstrapModule, SelectEstadoModule } from 'man-lab-ng';
import { TableModule } from 'primeng/table';
import { TarifaFormularioComponent } from './componentes/tarifa-formulario/tarifa-formulario.component';
import { CrearEditarTarifaComponent } from './modales/crear-editar-tarifa/crear-editar-tarifa.component';
import { RutaGestionTarifaComponent } from './rutas/ruta-gestion-tarifa/ruta-gestion-tarifa.component';
import { TarifaRoutingModule } from './tarifa-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    CrearEditarTarifaComponent,
    RutaGestionTarifaComponent,
    TarifaFormularioComponent,
  ],
  imports: [
    CommonModule,
    TarifaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    TextMaskModule,
    TituloPantallaModule
  ],
  entryComponents: [CrearEditarTarifaComponent],
  exports: [RutaGestionTarifaComponent],
  providers: [],
})
export class TarifaModule {}
