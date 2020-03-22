import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TablaArticuloBodegaComponent} from './tabla-articulo-bodega/tabla-articulo-bodega.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [TablaArticuloBodegaComponent],
  exports: [TablaArticuloBodegaComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class TablaArticuloBodegaModule { }
