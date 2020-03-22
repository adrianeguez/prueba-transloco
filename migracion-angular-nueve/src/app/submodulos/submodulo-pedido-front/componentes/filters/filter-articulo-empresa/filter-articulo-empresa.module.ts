import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArticuloEmpresaComponent } from './filter-articulo-empresa/filter-articulo-empresa.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [FilterArticuloEmpresaComponent],
  exports: [
    FilterArticuloEmpresaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FilterArticuloEmpresaModule { }
