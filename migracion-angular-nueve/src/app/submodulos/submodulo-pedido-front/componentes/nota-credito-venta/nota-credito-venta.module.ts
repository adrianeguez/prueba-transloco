import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaCreditoVentaComponent } from './nota-credito-venta/nota-credito-venta.component';
import { FieldsetModule } from 'primeng/primeng';

@NgModule({
  declarations: [NotaCreditoVentaComponent],
  exports: [NotaCreditoVentaComponent],
  imports: [CommonModule, FieldsetModule],
})
export class NotaCreditoVentaModule {}
