import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaArticuloServicioComponent} from './lista-articulo-servicio/lista-articulo-servicio.component';
import {FilterArticuloServicioModule} from '../filter-articulo-servicio/filter-articulo-servicio.module';
import {TranslocoModule} from '@ngneat/transloco';
import {TablaArticuloEmpresaModule} from '../../../../componentes/tablas/tabla-articulo-empresa/tabla-articulo-empresa.module';

@NgModule({
  declarations: [ListaArticuloServicioComponent],
  imports: [
    CommonModule,
    FilterArticuloServicioModule,
    TranslocoModule,
    TablaArticuloEmpresaModule,
  ],
  exports: [ListaArticuloServicioComponent]
})
export class ListaArticuloServicioModule {
}
