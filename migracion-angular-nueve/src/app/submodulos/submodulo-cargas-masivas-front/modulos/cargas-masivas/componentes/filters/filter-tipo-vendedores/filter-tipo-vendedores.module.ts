import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTipoVendedoresComponent } from './filter-tipo-vendedores/filter-tipo-vendedores.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterTipoVendedoresComponent],
  exports: [FilterTipoVendedoresComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterTipoVendedoresModule {}
