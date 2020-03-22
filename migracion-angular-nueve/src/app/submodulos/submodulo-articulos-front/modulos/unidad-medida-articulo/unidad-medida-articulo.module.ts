import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {ConfirmacionModule, ManLabNgBootstrapModule, ModalConfirmacionComponent, SelectEstadoModule} from 'man-lab-ng';
import { DropdownModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SelectArticuloComponent } from './componentes/select-articulo/select-articulo.component';
import { AsignarArticuloComponent } from './modales/asignar-articulo/asignar-articulo.component';
// tslint:disable-next-line: max-line-length
import { RutaGestionUnidadMedidaArticuloComponent } from './rutas/ruta-gestion-unidad-medida-articulo/ruta-gestion-unidad-medida-articulo.component';
import { UnidadMedidaArticuloRoutingModule } from './unidad-medida-articulo-routing.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionUnidadMedidaArticuloComponent,
    AsignarArticuloComponent,
    SelectArticuloComponent,
  ],
  imports: [
    CommonModule,
    UnidadMedidaArticuloRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    DropdownModule,
    ConfirmacionModule,
    TituloPantallaModule
  ],
  exports: [RutaGestionUnidadMedidaArticuloComponent],
  entryComponents: [ModalConfirmacionComponent],
  providers: [],
})
export class UnidadMedidaArticuloModule {}
