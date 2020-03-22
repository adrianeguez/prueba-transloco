import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDarBajaCantidadComponent } from './modal-dar-baja-cantidad/modal-dar-baja-cantidad.component';
import { MatDialogModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalDarBajaCantidadComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ModalDarBajaCantidadModule {}
