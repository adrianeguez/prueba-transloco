import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArticulosComponent } from './filter-articulos/filter-articulos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterArticulosComponent],
  imports: [CommonModule, FormsModule],
  exports: [FilterArticulosComponent],
})
export class FilterArticulosModule {}
