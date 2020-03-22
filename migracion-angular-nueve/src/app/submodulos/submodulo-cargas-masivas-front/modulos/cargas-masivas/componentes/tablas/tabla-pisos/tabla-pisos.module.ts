import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaPisosComponent } from './tabla-pisos/tabla-pisos.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaPisosComponent],
  exports: [TablaPisosComponent],
  imports: [CommonModule, TableModule],
})
export class TablaPisosModule {}
