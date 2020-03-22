import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaComponent } from './venta/venta.component';

@NgModule({
  declarations: [VentaComponent],
  exports: [VentaComponent],
  imports: [CommonModule],
})
export class VentaModule {}
