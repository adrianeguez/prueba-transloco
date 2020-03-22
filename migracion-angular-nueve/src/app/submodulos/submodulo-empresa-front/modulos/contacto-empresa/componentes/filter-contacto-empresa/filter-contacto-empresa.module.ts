import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterContactosEmpresaComponent} from './filter-contactos-empresa/filter-contactos-empresa.component';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [FilterContactosEmpresaComponent],
  imports: [
    CommonModule,
    TranslocoModule,
  ],
  exports: [
    FilterContactosEmpresaComponent
  ]
})
export class FilterContactoEmpresaModule {
}
