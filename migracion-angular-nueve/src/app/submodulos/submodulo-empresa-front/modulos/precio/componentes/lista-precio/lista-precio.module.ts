import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPrecioComponent} from './lista-precio/lista-precio.component';
import {FilterPrecioModule} from '../filter-precio/filter-precio.module';
import {TablaPrecioModule} from '../tabla-precio/tabla-precio.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ListaPrecioComponent],
  imports: [
    CommonModule,
    FilterPrecioModule,
    TablaPrecioModule,
    TranslocoModule,
  ],
  exports: [ListaPrecioComponent],
})
export class ListaPrecioModule {
}
