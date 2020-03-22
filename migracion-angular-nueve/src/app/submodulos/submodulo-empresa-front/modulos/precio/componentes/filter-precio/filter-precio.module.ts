import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPrecioComponent} from './filter-precio/filter-precio.component';
import {FormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [FilterPrecioComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
  ],
  exports: [FilterPrecioComponent],
})
export class FilterPrecioModule {
}
