import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTipoCargoComponent } from './select-tipo-cargo/select-tipo-cargo.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [SelectTipoCargoComponent],
  imports: [CommonModule, DropdownModule],
  exports: [SelectTipoCargoComponent],
})
export class SelectTipoCargoModule {}
