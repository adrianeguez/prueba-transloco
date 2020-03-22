import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDatosVendedorRoutingModule } from './tipo-datos-vendedor-routing.module';
import { RutaTipoDatosVendedorComponent } from './rutas/ruta-tipo-datos-vendedor/ruta-tipo-datos-vendedor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManLabNgBootstrapModule, SelectEstadoModule} from 'man-lab-ng';
import { MatDialogModule } from '@angular/material/dialog';
import {TableModule} from 'primeng/table';
import {AsignarTipoVendedorComponent} from './modales/asignar-tipo-vendedor/asignar-tipo-vendedor.component';
import {SelectTipoVendedorModule} from '../../componentes/select-tipo-vendedor/select-tipo-vendedor.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaTipoDatosVendedorComponent, AsignarTipoVendedorComponent],
  imports: [
    CommonModule,
    TipoDatosVendedorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    SelectTipoVendedorModule,
    TituloPantallaModule,
  ],
  exports: [
    RutaTipoDatosVendedorComponent,
  ],
  entryComponents: [
    AsignarTipoVendedorComponent,
  ]
})
export class TipoDatosVendedorModule { }
