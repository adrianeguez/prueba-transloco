import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';

@NgModule({
  declarations: [IngresoEgresoComponent],
  exports: [IngresoEgresoComponent],
  imports: [CommonModule],
})
export class IngresoEgresoModule {}
