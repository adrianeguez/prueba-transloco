import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservacionesComponent } from './observaciones/observaciones.component';

@NgModule({
  declarations: [ObservacionesComponent],
  exports: [ObservacionesComponent],
  imports: [CommonModule],
})
export class ObservacionesModule {}
