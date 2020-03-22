import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectEstadoPedidoComponent } from './select-estado-pedido/select-estado-pedido.component';
import {DropdownModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectEstadoPedidoComponent],
  exports: [
    SelectEstadoPedidoComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ]
})
export class SelectEstadoPedidoModule { }
