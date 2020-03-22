import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSubgruposComponent } from './tabla-subgrupos/tabla-subgrupos.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaSubgruposComponent],
  exports: [TablaSubgruposComponent],
  imports: [CommonModule, TableModule],
})
export class TablaSubgruposModule {}
