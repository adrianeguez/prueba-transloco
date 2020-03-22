import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaGruposComponent],
  exports: [TablaGruposComponent],
  imports: [CommonModule, TableModule],
})
export class TablaGruposModule {}
