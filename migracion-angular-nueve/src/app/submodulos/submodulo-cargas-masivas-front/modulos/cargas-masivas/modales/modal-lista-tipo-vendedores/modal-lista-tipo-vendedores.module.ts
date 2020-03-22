import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaTipoVendedoresComponent } from './modal-lista-tipo-vendedores/modal-lista-tipo-vendedores.component';
import { FilterTipoVendedoresModule } from '../../componentes/filters/filter-tipo-vendedores/filter-tipo-vendedores.module';
import { TablaTipoVendedoresModule } from '../../componentes/tablas/tabla-tipo-vendedores/tabla-tipo-vendedores.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaTipoVendedoresComponent],
  imports: [
    CommonModule,
    FilterTipoVendedoresModule,
    TablaTipoVendedoresModule,
    MatDialogModule,
  ],
})
export class ModalListaTipoVendedoresModule {}
