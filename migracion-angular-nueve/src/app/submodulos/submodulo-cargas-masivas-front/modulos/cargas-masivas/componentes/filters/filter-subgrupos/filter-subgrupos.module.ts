import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSubgruposComponent } from './filter-subgrupos/filter-subgrupos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterSubgruposComponent],
  exports: [FilterSubgruposComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterSubgruposModule {}
