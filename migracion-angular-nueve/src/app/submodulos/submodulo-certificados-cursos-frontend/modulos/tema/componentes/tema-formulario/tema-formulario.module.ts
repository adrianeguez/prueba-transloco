import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TemaFormularioComponent} from './tema-formulario.component';

@NgModule({
  declarations: [
    TemaFormularioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    AutoCompleteModule,
  ],
  exports: [
    TemaFormularioComponent,
  ]
})
export class TemaFormularioModule { }
