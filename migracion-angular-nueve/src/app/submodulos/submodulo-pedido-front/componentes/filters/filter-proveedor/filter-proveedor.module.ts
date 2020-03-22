import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterProveedorComponent } from './filter-proveedor/filter-proveedor.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [FilterProveedorComponent],
  exports: [
    FilterProveedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FilterProveedorModule { }
