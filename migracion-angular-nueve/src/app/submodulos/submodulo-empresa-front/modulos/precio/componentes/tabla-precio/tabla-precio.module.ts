import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablaPrecioComponent} from './tabla-precio/tabla-precio.component';
import {TableModule} from 'primeng/table';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [TablaPrecioComponent],
  imports: [
    CommonModule,
    TableModule,
    TranslocoModule,
  ],
  exports: [TablaPrecioComponent]
})
export class TablaPrecioModule {
}
