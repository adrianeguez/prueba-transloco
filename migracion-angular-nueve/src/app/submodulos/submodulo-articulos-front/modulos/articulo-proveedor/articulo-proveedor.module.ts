import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloProveedorRoutingModule } from './articulo-proveedor-routing.module';
import { RutaGestionArticuloProveedorComponent } from './ruta/ruta-gestion-articulo-proveedor/ruta-gestion-articulo-proveedor.component';
import { AsignarArticuloProveedorComponent } from './modales/asignar-articulo-proveedor/asignar-articulo-proveedor.component';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [RutaGestionArticuloProveedorComponent, AsignarArticuloProveedorComponent],
  imports: [
    CommonModule,
    ArticuloProveedorRoutingModule,
    ManLabNgBootstrapModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    AsignarArticuloProveedorComponent
  ]
})
export class ArticuloProveedorModule {}
