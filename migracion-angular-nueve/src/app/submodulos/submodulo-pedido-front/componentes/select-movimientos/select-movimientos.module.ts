import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMovimientosComponent } from './select-movimientos/select-movimientos.component';
import {DropdownModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectMovimientosComponent],
  exports: [
    SelectMovimientosComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ]
})
export class SelectMovimientosModule { }
