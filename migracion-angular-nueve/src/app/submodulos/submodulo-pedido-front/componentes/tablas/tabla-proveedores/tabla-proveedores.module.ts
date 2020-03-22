import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [TablaProveedoresComponent],
  exports: [
    TablaProveedoresComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class TablaProveedoresModule { }
