import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterEdificioComponent } from './filter-edificio/filter-edificio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterEdificioComponent],
  exports: [FilterEdificioComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterEdificioModule {}
