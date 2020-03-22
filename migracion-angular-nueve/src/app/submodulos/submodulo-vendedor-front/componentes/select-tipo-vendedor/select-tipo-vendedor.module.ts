import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectTipoVendedorComponent} from './select-tipo-vendedor/select-tipo-vendedor.component';
import {AutoCompleteModule, DropdownModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectTipoVendedorComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [SelectTipoVendedorComponent],
})
export class SelectTipoVendedorModule { }
