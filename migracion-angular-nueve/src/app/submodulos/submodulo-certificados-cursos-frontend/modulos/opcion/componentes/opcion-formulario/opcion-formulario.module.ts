import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';
import {ReactiveFormsModule} from '@angular/forms';
import {OpcionFormularioComponent} from './opcion-formulario.component';

@NgModule({
  declarations: [
    OpcionFormularioComponent
  ],
  imports: [
    CommonModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  exports: [
    OpcionFormularioComponent
  ],
})
export class OpcionFormularioModule {
}
