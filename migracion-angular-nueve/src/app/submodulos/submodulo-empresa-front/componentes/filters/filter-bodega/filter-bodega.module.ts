import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBodegaComponent } from './filter-bodega/filter-bodega.component';
import { FormsModule } from '@angular/forms';
import { SelectEsPerchaBodegaModule } from '../../selects/select-es-percha-bodega/select-es-percha-bodega.module';
import { SelectEstadoModule } from 'man-lab-ng';

@NgModule({
  declarations: [FilterBodegaComponent],
  exports: [FilterBodegaComponent],
  imports: [
    CommonModule,
    SelectEstadoModule,
    SelectEsPerchaBodegaModule,
    FormsModule,
  ],
})
export class FilterBodegaModule {}
