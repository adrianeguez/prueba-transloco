import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import {ConfirmacionModule, ManLabNgBootstrapModule, ModalConfirmacionComponent, SelectEstadoModule} from 'man-lab-ng';
import { DropdownModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ArticuloUnidadMedidaRoutingModule } from './articulo-unidad-medida-routing.module';
import { AgregarArticuloComponent } from './modales/agregar-articulo/agregar-articulo.component';
// tslint:disable-next-line: max-line-length
import { RutaGestionArticuloUnidadMedidaComponent } from './rutas/ruta-gestion-articulo-unidad-medida/ruta-gestion-articulo-unidad-medida.component';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaGestionArticuloUnidadMedidaComponent,
    AgregarArticuloComponent,
  ],
  imports: [
    CommonModule,
    ArticuloUnidadMedidaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TableModule,
    SelectEstadoModule,
    DropdownModule,
    ConfirmacionModule,
    TituloPantallaModule,
  ],
  entryComponents: [AgregarArticuloComponent, ModalConfirmacionComponent],
  exports: [RutaGestionArticuloUnidadMedidaComponent],
})
export class ArticuloUnidadMedidaModule {}
