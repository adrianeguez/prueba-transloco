import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMovimientoComponent } from './filter-movimiento/filter-movimiento.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterMovimientoComponent],
  exports: [FilterMovimientoComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterMovimientoModule {}
