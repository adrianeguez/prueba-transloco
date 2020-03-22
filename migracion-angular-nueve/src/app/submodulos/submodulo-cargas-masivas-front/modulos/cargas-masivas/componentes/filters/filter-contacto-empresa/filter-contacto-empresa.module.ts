import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterContactoEmpresaComponent } from './filter-contacto-empresa/filter-contacto-empresa.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterContactoEmpresaComponent],
  exports: [FilterContactoEmpresaComponent],
  imports: [CommonModule, FormsModule],
})
export class FilterContactoEmpresaModule {}
