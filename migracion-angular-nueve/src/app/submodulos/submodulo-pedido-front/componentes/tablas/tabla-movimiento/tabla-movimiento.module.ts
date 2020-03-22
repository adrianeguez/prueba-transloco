import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaMovimientoComponent } from './tabla-movimiento/tabla-movimiento.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaMovimientoComponent],
  exports: [TablaMovimientoComponent],
  imports: [CommonModule, TableModule],
})
export class TablaMovimientoModule {}
