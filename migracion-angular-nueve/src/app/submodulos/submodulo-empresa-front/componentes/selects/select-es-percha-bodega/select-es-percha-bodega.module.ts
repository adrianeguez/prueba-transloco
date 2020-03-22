import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectEsPerchaBodegaComponent } from './select-es-percha-bodega/select-es-percha-bodega.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [SelectEsPerchaBodegaComponent],
  imports: [CommonModule, DropdownModule],
  exports: [SelectEsPerchaBodegaComponent],
})
export class SelectEsPerchaBodegaModule {}
