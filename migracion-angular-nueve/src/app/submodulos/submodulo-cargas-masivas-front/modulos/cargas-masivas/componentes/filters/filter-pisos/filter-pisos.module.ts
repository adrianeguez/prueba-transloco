import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPisosComponent } from './filter-pisos/filter-pisos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterPisosComponent],
  exports: [FilterPisosComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterPisosModule {}
