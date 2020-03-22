import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaCreditoCompraComponent } from './nota-credito-compra/nota-credito-compra.component';
import { FieldsetModule } from 'primeng/primeng';

@NgModule({
  declarations: [NotaCreditoCompraComponent],
  exports: [NotaCreditoCompraComponent],
  imports: [CommonModule, FieldsetModule],
})
export class NotaCreditoCompraModule {}
