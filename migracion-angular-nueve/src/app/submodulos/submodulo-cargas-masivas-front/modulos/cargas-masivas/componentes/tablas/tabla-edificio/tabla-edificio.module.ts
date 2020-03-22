import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaEdificioComponent } from './tabla-edificio/tabla-edificio.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaEdificioComponent],
  exports: [TablaEdificioComponent],
  imports: [CommonModule, TableModule],
})
export class TablaEdificioModule {}
