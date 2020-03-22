import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {TableModule} from 'primeng/table';
import {RutaMenuArticuloComponent} from './ruta-menu-articulo/ruta-menu-articulo.component';
import {RutaRoutingModule} from './ruta-routing.module';
import {ItemMenuModule} from '../../submodulo-front-comun/modulos/item-menu/item-menu.module';
import {TituloPantallaModule} from '../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [RutaMenuArticuloComponent],
  imports: [
    CommonModule,
    RutaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    ItemMenuModule,
    TituloPantallaModule,
  ],
  exports: [RutaMenuArticuloComponent],
})
export class RutaModule {
}
