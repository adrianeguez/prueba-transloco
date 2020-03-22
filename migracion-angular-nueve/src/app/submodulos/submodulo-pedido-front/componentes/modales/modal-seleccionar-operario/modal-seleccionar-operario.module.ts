import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSeleccionarOperarioComponent } from './modal-seleccionar-operario/modal-seleccionar-operario.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalSeleccionarOperarioComponent],
  imports: [CommonModule, MatDialogModule],
})
export class ModalSeleccionarOperarioModule {}
