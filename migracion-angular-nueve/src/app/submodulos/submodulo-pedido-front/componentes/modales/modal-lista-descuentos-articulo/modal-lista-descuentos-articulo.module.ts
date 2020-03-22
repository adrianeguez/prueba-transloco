import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaDescuentosArticuloComponent } from './modal-lista-descuentos-articulo/modal-lista-descuentos-articulo.component';
import {ListaDescuentosArticuloModule} from '../../lista-descuentos-articulo/lista-descuentos-articulo.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalDescuentosModule} from '../modal-descuentos/modal-descuentos.module';
import {ModalDescuentosComponent} from '../modal-descuentos/modal-descuentos/modal-descuentos.component';

@NgModule({
  declarations: [ModalListaDescuentosArticuloComponent],
  imports: [
    CommonModule,
    ListaDescuentosArticuloModule,
    MatDialogModule,
    ModalDescuentosModule
  ],
  exports: [
    ModalListaDescuentosArticuloComponent
  ],
  entryComponents: [
    ModalDescuentosComponent
  ]
})
export class ModalListaDescuentosArticuloModule { }
