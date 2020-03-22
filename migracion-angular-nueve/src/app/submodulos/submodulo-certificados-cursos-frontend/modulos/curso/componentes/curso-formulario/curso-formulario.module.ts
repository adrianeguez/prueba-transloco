import {NgModule} from '@angular/core';
import {CursoFormularioComponent} from './curso-formulario.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [CursoFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    MatDialogModule,
    TranslocoModule,
    AutoCompleteModule
  ],
  exports: [CursoFormularioComponent]
})
export class CursoFormularioModule {
}
