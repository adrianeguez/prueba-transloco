import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecioRoutingModule } from './precio-routing.module';
import { PrecioFormularioComponent } from './componentes/precio-formulario/precio-formulario.component';
import { RutaGestionPreciosComponent } from './rutas/ruta-gestion-precios/ruta-gestion-precios.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ConfirmacionModule,
  ManLabNgBootstrapModule,
  ModalConfirmacionComponent,
  SelectEstadoModule,
} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { CrearEditarPrecioComponent } from './modales/crear-editar-precio/crear-editar-precio.component';
import { TextMaskModule } from 'angular2-text-mask';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    PrecioFormularioComponent,
    RutaGestionPreciosComponent,
    CrearEditarPrecioComponent,
  ],
  imports: [
    CommonModule,
    PrecioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    TextMaskModule,
    ConfirmacionModule,
    TituloPantallaModule,
  ],
  entryComponents: [CrearEditarPrecioComponent, ModalConfirmacionComponent],
  exports: [RutaGestionPreciosComponent, PrecioFormularioComponent],
  providers: [],
})
export class PrecioModule {}
