import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUsuarioComponent } from './components/filter-usuario/filter-usuario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterUsuarioComponent],
  imports: [CommonModule, FormsModule],
  exports: [FilterUsuarioComponent],
})
export class FilterUsuarioModule {}
