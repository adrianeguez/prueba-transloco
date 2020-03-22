import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterArticuloServicioComponent} from './filter-articulo-servicio/filter-articulo-servicio.component';
import {FormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [FilterArticuloServicioComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
  ],
  exports: [FilterArticuloServicioComponent]
})
export class FilterArticuloServicioModule {
}
