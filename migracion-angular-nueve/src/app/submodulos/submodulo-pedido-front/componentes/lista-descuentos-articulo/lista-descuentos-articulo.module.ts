import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDescuentosArticulosComponent } from './lista-descuentos-articulos/lista-descuentos-articulos.component';
import {TableModule} from 'primeng/table';
import {ModalDescuentosModule} from '../modales/modal-descuentos/modal-descuentos.module';
import {ModalDescuentosComponent} from '../modales/modal-descuentos/modal-descuentos/modal-descuentos.component';
import {ManLabNgModule, ModalConfirmacionComponent} from 'man-lab-ng';

@NgModule({
  declarations: [ListaDescuentosArticulosComponent],
  imports: [
    CommonModule,
    TableModule,
    ModalDescuentosModule,
    ManLabNgModule
  ],
  exports: [
    ListaDescuentosArticulosComponent
  ],
  entryComponents: [
    ModalDescuentosComponent,
    ModalConfirmacionComponent
  ]
})
export class ListaDescuentosArticuloModule { }
