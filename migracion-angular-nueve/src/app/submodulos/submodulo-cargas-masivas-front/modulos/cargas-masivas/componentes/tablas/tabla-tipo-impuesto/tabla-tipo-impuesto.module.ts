import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoImpuestoComponent } from './tabla-tipo-impuesto/tabla-tipo-impuesto.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaTipoImpuestoComponent],
  exports: [TablaTipoImpuestoComponent],
  imports: [CommonModule, TableModule],
})
export class TablaTipoImpuestoModule {}
