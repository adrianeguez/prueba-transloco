import {NgModule} from '@angular/core';
import {PreguntaFormularioComponent} from './pregunta-formulario.component';
import {CommonModule} from '@angular/common';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoModule} from '@ngneat/transloco';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
    declarations: [
      PreguntaFormularioComponent,
    ],
    imports: [
      CommonModule,
      ManLabNgBootstrapModule,
      FormsModule,
      MatDialogModule,
      TranslocoModule,
      ReactiveFormsModule,
      AutoCompleteModule,
    ],
    exports: [
      PreguntaFormularioComponent
    ]
  }
)
export class PreguntaFormularioModule {
}
