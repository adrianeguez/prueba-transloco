import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterGruposComponent } from './filter-grupos/filter-grupos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterGruposComponent],
  exports: [FilterGruposComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterGruposModule {}
