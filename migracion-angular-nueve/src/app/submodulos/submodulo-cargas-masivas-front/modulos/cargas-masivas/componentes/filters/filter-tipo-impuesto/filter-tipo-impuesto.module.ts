import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTipoImpuestoComponent } from './filter-tipo-impuesto/filter-tipo-impuesto.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterTipoImpuestoComponent],
  exports: [FilterTipoImpuestoComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterTipoImpuestoModule {}
