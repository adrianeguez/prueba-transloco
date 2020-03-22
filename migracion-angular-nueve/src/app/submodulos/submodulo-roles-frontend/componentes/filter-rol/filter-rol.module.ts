import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterRolComponent } from './components/filter-rol/filter-rol.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterRolComponent],
  imports: [CommonModule, FormsModule],
  exports: [FilterRolComponent],
})
export class FilterRolModule {}
