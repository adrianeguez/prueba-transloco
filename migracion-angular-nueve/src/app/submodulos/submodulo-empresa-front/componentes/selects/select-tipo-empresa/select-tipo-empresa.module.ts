import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTipoEmpresaComponent } from './select-tipo-empresa/select-tipo-empresa.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [SelectTipoEmpresaComponent],
  imports: [DropdownModule, CommonModule],
  exports: [SelectTipoEmpresaComponent],
})
export class SelectTipoEmpresaModule {}
