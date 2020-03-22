import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCrearPtoEmiOpeComponent } from './modal-crear-pto-emi-ope/modal-crear-pto-emi-ope.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CrearPtoEmiOpeFormularioComponent } from '../../formularios/crear-pto-emi-ope-form/crear-pto-emi-ope-formulario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ManLabNgBootstrapModule } from 'man-lab-ng';

@NgModule({
  declarations: [
    ModalCrearPtoEmiOpeComponent,
    CrearPtoEmiOpeFormularioComponent,
  ],
  imports: [
    CommonModule,
    CurrencyMaskModule,
    MatDialogModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
  ],
})
export class ModalCrearPtoEmiOpeModule {}
