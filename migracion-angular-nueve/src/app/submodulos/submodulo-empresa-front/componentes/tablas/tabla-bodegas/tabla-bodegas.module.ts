import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaBodegasComponent } from './tabla-bodegas/tabla-bodegas.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaBodegasComponent],
  exports: [TablaBodegasComponent],
  imports: [CommonModule, TableModule],
})
export class TablaBodegasModule {}
