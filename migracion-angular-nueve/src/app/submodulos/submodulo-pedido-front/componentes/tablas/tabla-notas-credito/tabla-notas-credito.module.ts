import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaNotasCreditoComponent } from './tabla-notas-credito/tabla-notas-credito.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaNotasCreditoComponent],
  exports: [TablaNotasCreditoComponent],
  imports: [CommonModule, TableModule],
})
export class TablaNotasCreditoModule {}
