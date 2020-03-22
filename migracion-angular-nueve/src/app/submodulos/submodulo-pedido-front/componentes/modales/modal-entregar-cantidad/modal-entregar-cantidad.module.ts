import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEntregarCantidadComponent } from './modal-entregar-cantidad/modal-entregar-cantidad.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalEntregarCantidadComponent],
  imports: [
    CommonModule,
    TextMaskModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ModalEntregarCantidadModule {}
