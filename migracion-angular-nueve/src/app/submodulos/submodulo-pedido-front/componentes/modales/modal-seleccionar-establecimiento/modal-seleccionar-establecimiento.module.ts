import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSeleccionarEstablecimientoComponent } from './modal-seleccionar-establecimiento/modal-seleccionar-establecimiento.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalSeleccionarEstablecimientoComponent],
  imports: [CommonModule, MatDialogModule],
})
export class ModalSeleccionarEstablecimientoModule {}
