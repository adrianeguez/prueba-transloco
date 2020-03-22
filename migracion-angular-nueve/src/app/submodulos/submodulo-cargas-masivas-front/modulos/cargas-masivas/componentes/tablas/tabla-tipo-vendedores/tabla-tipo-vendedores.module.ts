import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoVendedoresComponent } from './tabla-tipo-vendedores/tabla-tipo-vendedores.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaTipoVendedoresComponent],
  exports: [TablaTipoVendedoresComponent],
  imports: [CommonModule, TableModule],
})
export class TablaTipoVendedoresModule {}
