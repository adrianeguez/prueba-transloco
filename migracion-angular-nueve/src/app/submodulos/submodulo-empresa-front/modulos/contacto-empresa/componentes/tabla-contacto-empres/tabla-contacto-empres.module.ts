import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablaContactosEmpresaComponent} from './tabla-contactos-empresa/tabla-contactos-empresa.component';
import {TableModule} from 'primeng/table';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [TablaContactosEmpresaComponent],
  imports: [
    CommonModule,
    TableModule,
    TranslocoModule,
  ],
  exports: [
    TablaContactosEmpresaComponent
  ]
})
export class TablaContactoEmpresModule {
}
