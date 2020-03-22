import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticulosComponent} from './articulos/articulos.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';
import {ModalArticuloEmpresaModule} from '../modales/modal-articulo-empresa/modal-articulo-empresa.module';
import {ModalArticuloEmpresaComponent} from '../modales/modal-articulo-empresa/modal-articulo-empresa/modal-articulo-empresa.component';
import {ModalListaDescuentosArticuloModule} from '../modales/modal-lista-descuentos-articulo/modal-lista-descuentos-articulo.module';
// tslint:disable-next-line:max-line-length
import {ModalListaDescuentosArticuloComponent} from '../modales/modal-lista-descuentos-articulo/modal-lista-descuentos-articulo/modal-lista-descuentos-articulo.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {StockArticuloModule} from '../stock-articulo/stock-articulo.module';

@NgModule({
  declarations: [ArticulosComponent],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    FormsModule,
    DropdownModule,
    TextMaskModule,
    ModalArticuloEmpresaModule,
    ModalListaDescuentosArticuloModule,
    CurrencyMaskModule,
    StockArticuloModule,
  ],
  exports: [ArticulosComponent],
  entryComponents: [
    ModalArticuloEmpresaComponent,
    ModalListaDescuentosArticuloComponent
  ]
})

export class ArticulosModule {}
