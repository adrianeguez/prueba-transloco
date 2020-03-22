import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaArticulosComponent } from './tabla-articulos/tabla-articulos.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaArticulosComponent],
  imports: [CommonModule, TableModule],
  exports: [TablaArticulosComponent],
})
export class TablaArticulosModule {}
